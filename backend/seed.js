import mongoose from "mongoose";
import dotenv from "dotenv";
import JobRequest from "./src/models/JobRequest.js";

dotenv.config();

// Sample jobs data
const jobs = [
  {
    title: "Fix leaking kitchen tap",
    description: "Kitchen tap is leaking and needs repair",
    category: "Plumbing",
    location: "Colombo",
    contactName: "John",
    contactEmail: "john@example.com",
  },
  {
    title: "Electrical wiring issue",
    description: "Power keeps tripping in living room",
    category: "Electrical",
    location: "Kandy",
    contactName: "Sarah",
    contactEmail: "sarah@example.com",
  },
  {
    title: "Paint bedroom walls",
    description: "Need full repaint of bedroom",
    category: "Painting",
    location: "Galle",
    contactName: "David",
    contactEmail: "david@example.com",
  },
  {
    title: "Fix bathroom pipe",
    description: "Water leakage under sink",
    category: "Plumbing",
    location: "Negombo",
    contactName: "Emily",
    contactEmail: "emily@example.com",
  },
  {
    title: "Install ceiling fan",
    description: "Need installation of ceiling fan in bedroom",
    category: "Electrical",
    location: "Jaffna",
    contactName: "Michael",
    contactEmail: "michael@example.com",
  },
];

// Connect DB
await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected");

// Insert data
const seedDB = async () => {
  try {
    await JobRequest.deleteMany(); // clear old data
    await JobRequest.insertMany(jobs);

    console.log("Sample jobs inserted successfully");
    process.exit();
  } catch (error) {
    console.log("Error seeding data:", error);
    process.exit(1);
  }
};

seedDB();