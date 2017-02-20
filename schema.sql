-- DROP DATABASE spurr;

CREATE DATABASE spurr;

USE spurr;

CREATE TABLE users (
  /* Describe your table here.*/
  user_id int not null auto_increment,
  username varchar(15),
  password varchar(15),
  location varchar(15),
  Primary key(user_id),
  UNIQUE (username)
);

CREATE TABLE saved_spurrs (
  spurr_id int not null auto_increment,
  timestamp int,
  message varchar(15),
  location varchar(15),
  Primary key(spurr_id)
);

CREATE TABLE spurrs (
  spurr_id int not null auto_increment,
  timestamp int,
  message varchar(15),
  location varchar(15),
  Primary key(spurr_id)
);

CREATE TABLE user_saved_spurrs (
  id int not null auto_increment,
  user_id int,
  spurr_id int,
  timestamp int,
  message varchar(15),
  location varchar(15),
  Primary key(id),
  foreign key(user_id) references users (user_id),
  foreign key(spurr_id) references saved_spurrs (spurr_id)
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
