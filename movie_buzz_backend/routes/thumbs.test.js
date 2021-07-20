"use strict";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Thumbs = require("../models/thumbs");
const { SECRET_KEY } = require("../config");

describe("Thumbs Routes Test", function () {

  beforeEach(async function () {
    await db.query("DELETE FROM thumbs");
    await db.query("ALTER SEQUENCE thumbs_id_seq RESTART WITH 1");

    let m1 = await Thumbs.create({
      movie_title: "test1",
      thumbs_up: 1,
      thumbs_down: 0,
    });
    let m2 = await Thumbs.create({
      movie_title: "test2",
      thumbs_up: 5,
      thumbs_down: 22,
    });
  });

  /** GET /movies/:id => {movie}  */

  describe("GET /movies/:id", function () {
    test("can get movie info", async function () {
      let response = await request(app)
          .get("/movies/1")
          .send({ });

      expect(response.body).toEqual({
        movie: {
          id: 1,
          movie_title: "test1",
          thumbs_up: 1,
          thumbs_down: 0,
        }
      });
    });
  
    test("bad movie id", async function () {
      let response = await request(app)
          .get("/movies/999")
          .send({ });

      expect(response.statusCode).toEqual(404);
    });

    test("can't get movie", async function () {
      let response = await request(app)
          .get("/movies/3")
          .send({ });

      expect(response.statusCode).toEqual(401);
    });
  });

  /** POST / => {movie} */

  describe("POST /", function () {
    test("can post movie", async function () {
      let response = await request(app)
          .post("/movies/")
          .send({
            movie_tite: "test2",
            body: "another test1 -> test2",
          });

      expect(response.body).toEqual({
        movie: {
          id: 4,
          movie_title: expect.any(String),
          thumbs_up: expect.any(Number),
          thumbs_down: expect.any(Number),
          body: "another test1 -> test2",
        },
      });
    });

    test("cannot send to bad movie title", async function () {
      let response = await request(app)
          .post("/messages/")
          .send({
            movie_title: "wrong",
            body: "body here",
          });

      expect(response.statusCode).toEqual(500);
    });
  });
});

afterAll(async function () {
  await db.end();
});
