import JobRequest from "../models/JobRequest.js";
import { protect } from "../middleware/auth.js";

/**
 * GET /api/jobs
 * Supports:
 * - category filter
 * - status filter
 * - keyword search (title + description)
 */
export const getJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;

    const filter = {};

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    /**
     * Keyword search (FIXED + IMPROVED)
     * Uses proper MongoDB OR condition safely
     */
    if (search && search.trim() !== "") {
      filter.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const jobs = await JobRequest.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/jobs/:id
 */
export const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/jobs
 */
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    } = req.body;

    // Validation (important for interview)
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/jobs/:id
 */
export const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Open", "In Progress", "Closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.status = status;
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/jobs/:id
 */
export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};