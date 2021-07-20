"use strict";

const db = require("../db");
const Thumbs = require("./thumbs");

describe("Test Thumbs class", function () {

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

  test("can create", async function () {
    let m3 = await Thumbs.create({
      movie_title: "test3",
      thumbs_up: 4,
      thumbs_down: 3,
    });

    expect(m3).toEqual({
      id: expect.any(Number),
      movie_title: "test3",
      thumbs_up: 4,
      thumbs_down: 3,
    });
  });

  test("can update thumbs", async function () {
    let m = await Thumbs.create({
      id: 1,
      movie_title: "test1",
      thumbs_up: 2,
      thumbs_down: 0,
    });
    expect(m.what).toBe(undefined);

    Thumbs.thumbsUp(m.id);
    const result = await db.query("SELECT thumbs_up FROM thumbs WHERE id=$1",
        [m.id]);
    expect(result.rows[0].thumbs_up).toEqual(expect.any(Number));
  });

  test("can get", async function () {
    let u = await Thumbs.get(1);
    expect(u).toEqual({
      id: expect.any(Number),
      movie_title: "test1",
      thumbs_up: expect.any(Number),
      thumbs_down: expect.any(Number),
    });
  });
});

afterAll(async function () {
  await db.end();
});
