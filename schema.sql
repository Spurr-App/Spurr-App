CREATE DATABASE secrets;

USE secrets;



CREATE TABLE user (
  /* Describe your table here.*/
  user_id int not null auto_increment,
  username varchar(15),
  Primary key(user_id),
  UNIQUE (username)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int not null auto_increment,
  user_id int,
  message text,
  room_name varchar(15),
  Primary key(id)
  -- foreign key(user_id) references users (user_id)
);
/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
