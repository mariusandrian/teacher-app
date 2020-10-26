CREATE DATABASE teacher_app_test;

USE teacher_app_test;

CREATE TABLE student (
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(255) NOT NULL,
suspend CHAR(1) DEFAULT 'N',
PRIMARY KEY (id)
);

CREATE TABLE teacher (
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE teacher_has_student (
teacher_id INT,
student_id INT,
FOREIGN KEY (teacher_id) REFERENCES teacher(id),
FOREIGN KEY (student_id) REFERENCES student(id),
UNIQUE (teacher_id, student_id)
);

INSERT INTO teacher_app_test.teacher (email)
VALUES ('teacherken@gmail.com');

INSERT INTO teacher_app_test.teacher (email)
VALUES ('teacherjoe@gmail.com');

INSERT INTO teacher_app_test.student (email, suspend)
VALUES ("studentjon@gmail.com", "Y");
INSERT INTO teacher_app_test.student (email)
VALUES ("studenthon@gmail.com");
INSERT INTO teacher_app_test.student (email)
VALUES ('commonstudent1@gmail.com');
INSERT INTO teacher_app_test.student (email)
VALUES ('commonstudent2@gmail.com');

INSERT INTO teacher_app_test.teacher_has_student (teacher_id, student_id)
VALUES (1, 1);
INSERT INTO teacher_app_test.teacher_has_student (teacher_id, student_id)
VALUES (1, 2);
INSERT INTO teacher_app_test.teacher_has_student (teacher_id, student_id)
VALUES (1, 3);
INSERT INTO teacher_app_test.teacher_has_student (teacher_id, student_id)
VALUES (1, 4);

INSERT INTO teacher_app_test.teacher_has_student (teacher_id, student_id)
VALUES (2, 3);
INSERT INTO teacher_app_test.teacher_has_student (teacher_id, student_id)
VALUES (2, 4);