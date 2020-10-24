const express = require('express');
const mysql = require('mysql');

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
app.use(express.urlencoded());


// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE teacher_app';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created');
    })
})

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created');
    })
})

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post one', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 created');
    });
})
app.listen('3000', () => {
    console.log('Server started on port 3000');
})