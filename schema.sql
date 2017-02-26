DROP DATABASE spurr;

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
  date varchar(20),
  sender varchar(15),
  recipient varchar(15),
  message varchar(100),
  location varchar(15),
  inner_style varchar(200),
  outer_style varchar(200),
  Primary key(spurr_id)
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

CREATE TABLE user_saved_spurrs (
  id int not null auto_increment,
  user_id int,
  spurr_id int,
  date varchar(20),
  message varchar(450),
  location varchar(15),
  Primary key(id),
  foreign key(user_id) references users (user_id),
  foreign key(spurr_id) references saved_spurrs (spurr_id)
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

INSERT INTO users (username, location) VALUES ("liv", 'new orleans');

INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Check it out, I'm lame", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Things will be okay", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Imagine... Nothing", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "Check it out again", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I killed my neighbour", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I love you", '{"font-family":"arial","font-size":"21px","color":"black"}');
INSERT INTO spurrs (date, location, message, inner_style) VALUES ("Wed Feb 22 2017", "NOLA", "I hate you", '{"font-family":"arial","font-size":"21px","color":"black"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, message, inner_style, outer_style)
VALUES ("Wed Feb 2 2017", "liv", "alice", "nola", "Jigeum neon odiya?",
  '{"font-family":"arial","font-size":"21px","color":"black"}',
  '{"background-image":"none","background-color":"red"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, message, inner_style, outer_style)
VALUES ("Wed Feb 5 2017", "liv", "alice", "NOLA", "I fear, I'm real.",
  '{"font-family":"arial","font-size":"21px","color":"white"}',
  '{"background-image":"none","background-color":"blue"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, message, inner_style, outer_style)
VALUES ("Wed Feb 8 2017", "liv", "alice", "Paradise", "I'm not coming back",
  '{"font-family":"arial","font-size":"21px","color":"black"}',
  '{"background-image":"none","background-color":"lightgreen"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, message, inner_style, outer_style)
VALUES ("Wed Feb 10 2017", "liv", "alice", "Dongdaemun", "I miss shopping in Korea",
  '{"font-family":"helvetica","font-size":"12px","color":"red"}',
  '{"background-image":"url(../assets/heart-back.png)","background-color":"white"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, message, inner_style, outer_style)
VALUES ("Wed Feb 21 2017", "liv", "alice", "home", "happy birthday mom!",
  '{"font-family":"comic sans ms","font-size":"21px","color":"black"}',
  '{"background-image":"url(../assets/letter-back.png)","background-color":"lightgrey"}');

INSERT INTO saved_spurrs (date, sender, recipient, location, message, inner_style, outer_style)
VALUES ("Wed Feb 24 2017", "liv", "alice", "Korea", "Hope this shit works",
  '{"font-family":"arial","font-size":"21px","color":"black"}',
  '{"background-image":"url(../assets/dot-back.png)","background-color":"lightgrey"}');
