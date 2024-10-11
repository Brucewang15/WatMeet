CREATE TABLE users (
    user_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    password_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    created_at Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE userorg (
    userorg_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    org_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) UPDATE CASCADE,
    FOREIGN KEY (org_id) REFERENCES orginizations(org_id) UPDATE CASCADE
);

CREATE TABLE orginizations (
    org_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    org_name varchar(100) NOT NULL,
    user_id int NOT NULL,
    overview text NOT NULL,
    star_rating float NOT NULL,
    ranking_num int NOT NULL,
    org_type set("club", "intramural", "design", "society") NOT NULL,
    constitution text NOT NULL,
    created_at Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) UPDATE CASCADE
);

CREATE TABLE comments (
    comment_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comment_title varchar(100),
    comment_body text,
    user_id int NOT NULL,
    org_id int NOT NULL,
    star_rating int NOT NULL,
    upvote_num int NOT NULL,
    downvote_num int NOT NULL,
    created_at Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) UPDATE CASCADE,
    FOREIGN KEY (org_id) REFERENCES orginizations(org_id) UPDATE CASCADE
);

CREATE TABLE tags (
    tag_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    org_id int NOT NULL,
    tag_name varchar(100) NOT NULL
    FOREIGN KEY (org_id) REFERENCES orginizations(org_id) UPDATE CASCADE
);