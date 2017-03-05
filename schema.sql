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

INSERT INTO users (username, password, email)
VALUES ("liv", "liv", "liv@liv.com");
INSERT INTO users (username, password, email)
VALUES ("blake", "329h2fhd27hsdj", "blake@spurr.com");
INSERT INTO users (username, password, email)
VALUES ("jeremy", "owjn82208236hg", "jeremy@spurr.com");

INSERT INTO spurrs (date, location, message, inner_style, outer_style) VALUES ("Wed Feb 22 2017", "NOLA", "Come to the Wired, Lain", '{"font-family":"arial","font-size":"21px","color":"black"}', '{"background-image":"url(../assets/crazy-back.png)"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Things will be okay", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Imagine... Nothing", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Check it out again", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I killed my neighbour", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I love you", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style, outer_style) VALUES ("Wed Feb 22 2017", "NOLA", "I hate you", '{"font-family":"arial","font-size":"21px","color":"black"}', '{"background-image":"url(../assets/crazy-back.png)"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, user_id, message, inner_style, outer_style)
VALUES ("Wed Feb 5 2017", "liv", "alice", "New Orleans, LA", "1", "I fear, I'm real.",
  '{"font-family":"arial","font-size":"21px","color":"white"}',
  '{"background-image":"none","background-color":"blue"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, user_id, message, inner_style, outer_style)
VALUES ("Wed Feb 8 2017", "blake", "alice", "New Orleans, LA", "2", "I'm not coming back",
  '{"font-family":"arial","font-size":"21px","color":"black"}',
  '{"background-image":"url(../assets/cross-back.png)","background-color":"lightgreen"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, user_id, message, inner_style, outer_style)
VALUES ("Wed Feb 21 2017", "liv", "mom", "New Orleans, LA", "1", "happy birthday mom!",
  '{"font-family":"comic sans ms","font-size":"21px","color":"black"}',
  '{"background-image":"url(../assets/letter-back.png)","background-color":"lightgrey"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, user_id, message, inner_style, outer_style)
VALUES ("Wed Feb 24 2017", "jeremy", "Beatrice", "World Wide Web", "3", "I'm a lonely shark-man.",
  '{"font-family":"arial","font-size":"21px","color":"black"}',
  '{"background-image":"url(../assets/dot-back.png)","background-color":"lightgrey"}');
