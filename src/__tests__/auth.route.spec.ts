import request from "supertest";
import app from "../app";
import database from "../database";
import User from "../models/user.model";
import { dbConfig } from "../config";

const signupReqBody = {
  email: "testemail@gmail.com",
  password: "12345678910",
  username: "testadmin",
};

const loginReqBody = {
  email: "testemail@gmail.com",
  password: "12345678910",
};

describe("Auth Routes", () => {
  beforeAll(() => {
    database.connect(dbConfig.TEST_DATABASE);
  });

  afterAll(async () => {
    await User.findOneAndDelete({}, { sort: { _id: -1 } });
    database.disconnect();
  });

  describe("Signup Route", () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post("/api/auth/signup").send({});

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should return success message", async () => {
      const res = await request(app).post("/api/auth/signup").send(signupReqBody);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toEqual("Resource created successfully");
    }, 80000);
  });

  describe("Login Route", () => {
    it("should return 401 Unauthorized", async () => {
      const res = await request(app).post("/api/auth/login").send({});

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should return acccessToken and user object", async () => {
      const res = await request(app).post("/api/auth/login").send(loginReqBody);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.accessToken).toBeDefined();
      expect(res.body.user).toBeDefined();
    }, 80000);
  });

  describe("Logout Route", () => {
    it("should return logout success", async () => {
      const res = await request(app).get("/api/auth/logout");

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
    }, 80000);
  });
});
