import request from "supertest";
import app from "../src/server.js";
import mongoose from "mongoose";
import JobRequest from "../src/models/JobRequest.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);

beforeEach(async () => {
  await JobRequest.deleteMany({});
}, 20000);

describe("Job API Tests", () => {

  test("should return empty job list initially", async () => {
    const res = await request(app).get("/api/jobs");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  }, 20000);

  test("should create a new job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .send({
        title: "Need plumber",
        description: "Kitchen tap leaking",
        category: "Plumbing",
        location: "Glasgow",
        contactName: "John",
        contactEmail: "john@test.com",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Need plumber");
  }, 20000);

});