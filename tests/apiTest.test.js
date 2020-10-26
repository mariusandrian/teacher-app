const request = require('supertest');
const app = require('../index');


// ----------START OF POSITIVE TEST--------------
describe('GET /api/commonstudents?teacher=teacherken%40gmail.com', () => {
    it('respond with json containing a list of common students', (done) => {
        request(app)
            .get('/api/commonstudents?teacher=teacherken%40gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});

describe('POST /api/register', () => {
    let data = {
            "teacher": "teacherken@gmail.com",
            "students": [
                "studentjon@gmail.com",
                "studenthon@gmail.com"
            ]
        }
    
    it('responds with 204', (done) => {
        request(app)
            .post('/api/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(204, done);
    });
});

describe('POST /api/suspend', () => {
    let data = {
        "student" : "studentjon@gmail.com"
    }

    it('responds with 204', (done) => {
        request(app)
            .post('/api/suspend')
            .send(data)
            .set('Accept', 'application/json')
            .expect(204, done);
    });
});

describe('POST /api/retrievefornotifications', () => {
    let data = {
        "teacher": "teacherken@gmail.com",
        "notification": "Hello students! @studentjon@gmail.com @studenthon@gmail.com"
    }

    it('responds with 200', (done) => {
        request(app)
            .post('/api/retrievefornotifications')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});

// ----------START OF NEGATIVE TEST--------------
describe('POST /api/register with unrecognized teacher email', () => {
    let data = {
            "teacher": "test@gmail.com",
            "students": [
                "studentjon@gmail.com",
                "studenthon@gmail.com"
            ]
        }
    
    it('responds with 400', (done) => {
        request(app)
            .post('/api/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400, done);
    });
});

describe('POST /api/suspend with student that does not exist', () => {
    let data = {
        "student" : "test@gmail.com"
    }

    it('responds with 204', (done) => {
        request(app)
            .post('/api/suspend')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400, done);
    });
});

describe('Try to GET unknown route', () => {
    it('responds with 404', (done) => {
        request(app)
            .get('/test')
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});