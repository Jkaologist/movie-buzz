"use strict";

const { Router } = require("express");
const router = new Router();

const Thumbs = require("../models/thumbs");
const { UnauthorizedError } = require("../expressError");

/** GET /:id - get detail of message.
 *
 * => {Thumbs: {id,
 *               movie_title,
 *               thumbs_up,
 *               thumbs_down,
 *             }
 *    }
 *
 **/

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  let username = res.locals.user.username;
  let msg = await Thumbs.get(req.params.id);

  if (msg.to_user.username !== username
    && msg.from_user.username !== username) {
    throw new UnauthorizedError("Cannot read this message");
  }

  return res.json({ message: msg });
});


/** POST / - post thumbs to movie.
 *
 * {movie_title, thumbs_up, thumbs_down} =>
 *   {movie: {id, movie_title, thumbs_up, thumbs_down}}
 *
 **/

router.post("/", async function (req, res, next) {
  let movie = await Thumbs.create({
    movie_title: res.locals.movie_title,
    thumbs_up: req.body.body,
    thumbs_down: req.body.body,
  });

  return res.json({ movie: movie });
});

module.exports = router;
