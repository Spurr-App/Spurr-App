DROP DATABASE spurr;

CREATE DATABASE spurr;

USE spurr;

CREATE TABLE users (
  /* Describe your table here.*/
  id int not null auto_increment,
  username varchar(200),
  password varchar(200),
  email varchar(200),
  Primary key(id),
  UNIQUE (username)
);

CREATE TABLE saved_spurrs (
  spurr_id int not null auto_increment,
  date varchar(20),
  sender varchar(50),
  recipient varchar(50),
  message varchar(100),
  location varchar(200),
  inner_style varchar(200),
  user_id int,
  outer_style varchar(200),
  Primary key(spurr_id),
  foreign key(user_id) references users(id)
);

CREATE TABLE spurrs (
  spurr_id int not null auto_increment,
  date varchar(20),
  sender varchar(15),
  recipient varchar(15),
  message varchar(100),
  location varchar(15),
  inner_style varchar(200),
  outer_style varchar(200),
  Primary key(spurr_id)
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/


INSERT INTO spurrs (date, location, message, inner_style, outer_style) VALUES ("Wed Feb 22 2017", "NOLA", "Come to the Wired, Lain", '{"font-family":"arial","font-size":"21px","color":"black"}', '{"background-image":"url(../assets/crazy-back.png)"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Things will be okay", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Imagine... Nothing", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Check it out again", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I killed my neighbour", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I love you", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style, outer_style) VALUES ("Wed Feb 22 2017", "NOLA", "I hate you", '{"font-family":"arial","font-size":"21px","color":"black"}', '{"background-image":"url(../assets/crazy-back.png)"}');
