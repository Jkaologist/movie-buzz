"use strict";

/** Common config for movie buzz app */

// read .env files and make environmental variables

require("dotenv").config();

const DB_URI = (process.env.NODE_ENV === "test")
    ? "postgresql:///movie_buzz_test"
    : "postgresql:///movie_buzz";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

module.exports = {
  DB_URI,
  SECRET_KEY,
};