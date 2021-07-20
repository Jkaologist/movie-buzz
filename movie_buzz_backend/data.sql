\echo 'Delete and recreate movie buzz db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE movie_buzz;
CREATE DATABASE movie_buzz;
\connect movie_buzz

CREATE TABLE thumbs (
  id SERIAL PRIMARY KEY,
  movie_title TEXT NOT NULL,
  thumbs_up NUMBER,
  thumbs_down NUMBER);
);

\echo 'Delete and recreate movie buzz db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE movie_buzz_test;
CREATE DATABASE movie_buzz_test;
\connect movie_buzz_test

CREATE TABLE thumbs (
  id SERIAL PRIMARY KEY,
  movie_title TEXT NOT NULL,
  thumbs_up NUMBER,
  thumbs_down NUMBER);
);
