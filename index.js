const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'teacher_app'
})

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql connected...');
})
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const query = util.promisify(db.query).bind(db);

// Post students
app.post('/api/register', async (req, res) => {
    try {
        let students = req.body.students;
        let studentValues = students.map((student, index) => {
            return [student];
        });
        let sql = "INSERT IGNORE INTO student (email) VALUES ?";
        const studentInsert = await query(sql, [studentValues]);

        let teacherId;
        let studentId = [];
        let getTeacherId = "SELECT id FROM teacher WHERE email = ?";
        let getStudentId = "SELECT id FROM student WHERE email in (?) ORDER BY id";
        
        const getTeacherResult = await query(getTeacherId, req.body.teacher);
        teacherId = getTeacherResult[0].id;

        const getStudentResult = await query(getStudentId, [req.body.students]);
        getStudentResult.forEach((row, index) => {
            studentId.push([teacherId, row.id]);
        })

        let updateBridgeTable = `INSERT IGNORE INTO teacher_has_student (teacher_id, student_id) VALUES ?`;
        const updateBridgeTableResults = await query(updateBridgeTable, [studentId]);

        res.status(204).send();
    } catch (err) {
        console.log(err);
    }    
})

// Get common students
app.get('/api/commonstudents', async (req, res) => {
    try {
        let payload = [];
        // Parse incoming URL
        let teacherQuery = req.query.teacher;
        if (typeof teacherQuery === 'string') {
            teacherQuery = [teacherQuery];
        }

        let count = teacherQuery.length;

        const sql = `select s.email FROM student as s INNER JOIN teacher_has_student as ts ON s.id = ts.student_id INNER JOIN teacher as t ON ts.teacher_id = t.id WHERE t.email IN (?) GROUP BY s.email HAVING COUNT(t.email) = ?;`

        const students = await query(sql, [teacherQuery, count]);
        console.log(students);
        students.forEach((row) => {
            payload.push(row.email);
        })

        res.send({students: payload});
    } catch (err) {
        console.log(err);
    }
});

// Suspend student
app.post('/api/suspend', async(req, res) => {
    try {
        const student = req.body.student;
        let sql = `UPDATE student SET student.suspend = "Y" WHERE student.email = ?`
        const response = await query(sql, student);
        console.log(response);
        res.status(204).send();
    } catch (err) {
        console.log(err);
    }
});

// Notification
app.post('/api/retrievefornotifications', async(req, res) => {
    try {
        let teacher = req.body.teacher;
        let emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
        let mentions = req.body.notification.match(emailPattern);

        let recipients = [];
        let searchByTeacher = `select DISTINCT student.email FROM student INNER JOIN teacher_has_student ON student.id = teacher_has_student.student_id INNER JOIN teacher ON teacher_has_student.teacher_id = teacher_id WHERE teacher.email in (?) AND student.suspend = 'N';`

        let checkIfSuspended = `select student.email FROM student WHERE student.email in (?) AND student.suspend = 'N'`

        if (!mentions) {
            let results = await query(searchByTeacher, teacher);
            results.forEach((row) => {
                recipients.push(row.email);
            })
        } else {
            let results = await query(searchByTeacher, teacher);
            results.forEach((row) => {
                if (!mentions.includes(row.email)) {
                    mentions.push(row.email);
                }
            });
            let resultsWithoutSuspend = await query(checkIfSuspended, [mentions]);
            results.forEach((row) => {
                recipients.push(row.email);
            })
        }
        res.status(200).json({recipients: recipients});
    } catch (err) {
        console.log(err);
    }
})

app.listen('3000', () => {
    console.log('Server started on port 3000');
})