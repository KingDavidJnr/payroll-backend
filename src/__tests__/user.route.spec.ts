import request from "supertest";
import app from "../app";
import database from "../database";
import authService from "../services/auth.service";
import { Types } from "mongoose";
import { dbConfig } from "../config";

const userId = new Types.ObjectId();
let token = "";
const id: Types.ObjectId = new Types.ObjectId("646e3f289377c646a5a1e5de");
const randomId = new Types.ObjectId();

const payload = {
  firstname: "matthew",
  surname: "james",
};

describe("User Routes", () => {
  beforeAll(async () => {
    const { accessToken } = await authService.generateAccessToken({ userId });

    token = accessToken;

    database.connect(dbConfig.TEST_DATABASE);
  }, 80000);

  afterAll(async () => {
    token = "";
    database.disconnect();
  });

  describe("GET /api/users", () => {
    it("should return 403 forbidden", async () => {
      const res = await request(app).get("/api/users");

      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should return users from db", async () => {
      const res = await request(app).get("/api/users").set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.users).toBeDefined();
    }, 80000);
  });

  describe("GET /api/users/:id", () => {
    it("should return 403 forbidden", async () => {
      const res = await request(app).get(`/api/users/${id}`);

      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should return 401 user not found", async () => {
      const res = await request(app)
        .get(`/api/users/${randomId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should return user from db", async () => {
      const res = await request(app)
        .get(`/api/users/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toBeDefined();
    }, 80000);
  });

  describe("PUT /api/users/:id", () => {
    it("should return 403 forbidden", async () => {
      const res = await request(app).put(`/api/users/${id}`).send(payload);

      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should return 401 ", async () => {
      const res = await request(app)
        .put(`/api/users/${id}`)
        .send({})
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeDefined();
    }, 80000);

    it("should update user in db", async () => {
      const res = await request(app)
        .put(`/api/users/${id}`)
        .send(payload)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBeDefined();
    }, 80000);
  });

  // describe("DELETE /api/users/:id", () => {
  //   it("should return 403 forbidden", async () => {
  //     const res = await request(app).get(`/api/users/${id}`);

  //     expect(res.statusCode).toEqual(403);
  //     expect(res.body.success).toBe(false);
  //     expect(res.body.error).toBeDefined();
  //   }, 80000);

  //   it("should return 401 user not found", async () => {
  //     const res = await request(app)
  //       .delete(`/api/users/${randomId}`)
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(res.statusCode).toEqual(401);
  //     expect(res.body.success).toBe(false);
  //     expect(res.body.error).toBeDefined();
  //   }, 80000);

  //   it("should delete user in db", async () => {
  //     const res = await request(app)
  //       .delete(`/api/users/${id}`)
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.success).toBe(true);
  //     expect(res.body.message).toBeDefined();
  //   }, 80000);
  // });
});
