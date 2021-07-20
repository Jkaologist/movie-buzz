"use strict";

/** thumbs class for movie buzz app */

const { NotFoundError } = require("../expressError");
const db = require("../db");

/** Thumbs on the site. */

class Thumbs {

  /** Register new message -- returns
   *    {id, move_title, thumbs_up, thumbs_down}
   */

  static async create({ movie_title, thumbs_up, thumbs_down}) {
    const result = await db.query(
          `INSERT INTO thumbs ( movie_title,
            thumbs_up,
            thumbs_down)
             VALUES
               ($1, $2, $3)
             RETURNING id, movie_title, thumbs_up, thumbs_down`,
        [movie_title, thumbs_up, thumbs_down]);

    return result.rows[0];
  }

  /** Update thumbs_up for movie */

  static async thumbsUp(id) {
    const result = await db.query(
          `UPDATE thumbs
           SET thumbs_up = thumbs_up
             WHERE id = $1
             RETURNING id, thumbs_up`,
        [id]);
    const thumbs = result.rows[0];

    if (!thumbs) throw new NotFoundError(`No such movie: ${id}`);

    return thumbs;
  }

  /** Get: get movie by id
   *
   * returns {id, movie_title, thumbs_up, thumbs_down}
   *
   */

  static async get(id) {
    const result = await db.query(
          `SELECT id,
                  movie_title,
                  thumbs_up,
                  thumbs_down
             FROM thumbs
             WHERE id = $1`,
        [id]);

    let m = result.rows[0];

    if (!m) throw new NotFoundError(`No such message: ${id}`);

    return {
      id: m.id,
      movie_title: m.movie_title,
      thumbs_up: m.thumbs_up,
      thumbs_down: m.thumbs_down
    };
  }
}


module.exports = Thumbs;