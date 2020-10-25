USE teacher_app;

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

ALTER TABLE student
ALTER suspend SET DEFAULT 'N';

UPDATE student
SET suspend = 'N'
WHERE id = 120;

INSERT INTO teacher_app.teacher (email)
VALUES ('teacherjoe@gmail.com');

INSERT INTO teacher_app.student (email)
VALUES ('commonstudent2@gmail.com');

INSERT INTO teacher_app.teacher_has_student (teacher_id, student_id)
VALUES (1, 120);

SELECT * from teacher_app.teacher;

SELECT * from teacher_app.student;

SELECT * from teacher_app.teacher_has_student;



ALTER TABLE teacher_app.teacher
ADD UNIQUE(email);

SELECT teacher.id, teacher.email, student.id, student.email
FROM teacher
INNER JOIN teacher_has_student ON teacher.id = teacher_has_student.teacher_id
INNER JOIN student ON student.id = teacher_has_student.student_id = student.id;

select s.email, ts.student_id, ts.teacher_id, t.email 
FROM student as s
INNER JOIN teacher_has_student as ts ON s.id = ts.student_id
INNER JOIN teacher as t ON ts.teacher_id = teacher_id;

select ts.student_id, ts.teacher_id, t.email 
FROM teacher_has_student as ts
INNER JOIN teacher as t ON ts.teacher_id = t.teacher_id;

WHERE teacher.email IN ('teacherken@gmail.com', 'teacherjoe@gmail.com');

select DISTINCT student.email
FROM student
INNER JOIN teacher_has_student ON student.id = teacher_has_student.student_id
INNER JOIN teacher ON teacher_has_student.teacher_id = teacher_id
WHERE teacher.email = 'teacherken@gmail.com' AND student.suspend = 'N';

select student.email 
FROM student 
WHERE student.email IN ('studentjon@gmail.com', 'studenthon@gmail.com' ) 
AND student.suspend = 'N';

ALTER TABLE teacher_app.student
ADD UNIQUE(email);

DELETE FROM teacher_app.teacher_has_student WHERE teacher_id = 1;