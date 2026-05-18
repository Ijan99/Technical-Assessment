"use client";

import { useEffect, useState } from "react";
import API from "../services/api";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/jobs", {
        params: {
          ...(category && { category }),
          ...(search && { search }),
        },
      });

      setJobs(res.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category]);

  return (
    <div className="min-h-screen bg-blue-100 py-10">

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto p-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Service Request Board
          </h1>
          <p className="text-gray-500 mt-2">
            Browse, manage and track service requests
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search jobs (plumber, kitchen, leak...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={fetchJobs}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>

          {/* CATEGORY */}
          <select
            className="border p-2 rounded-md w-48 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-600 animate-pulse">
            Loading jobs...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-red-500 bg-red-50 p-3 rounded-md">
            <p>{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Retry
            </button>
          </div>
        )}

        {/* JOB LIST */}
        {!loading && !error && (
          <div className="grid gap-4">
            {jobs.length === 0 ? (
              <p className="text-gray-500">
                No service requests found.
              </p>
            ) : (
              jobs.map((job) => (
                <Link
                  key={job._id}
                  href={`/job/${job._id}`}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="font-semibold text-lg text-gray-800">
                    {job.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                     {job.location || "No location"}
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    {job.category || "Uncategorized"}
                  </p>

                  <span
                    className={`inline-flex mt-3 px-3 py-1 text-sm rounded-full font-medium ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : job.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}

        {/* FLOAT BUTTON */}
        <Link
          href="/new"
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl font-semibold transition"
        >
          + New Request
        </Link>

      </div>
    </div>
  );
}