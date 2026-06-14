const express = require('express');
const session = require('express-session');
require('dotenv').config();

const Database = require('./app/config/db');
const Logger = require('./app/services/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

const logger = new Logger();
const db = new Database();

const ProgramModel = require('./app/models/Program');
const FeedbackModel = require('./app/models/Feedback');

const programModel = new ProgramModel(db);
const feedbackModel = new FeedbackModel(db);

const PageController = require('./app/controllers/pageController');
const ProgramController = require('./app/controllers/programController');

const pageController = new PageController(programModel, feedbackModel, logger);
const programController = new ProgramController(programModel, feedbackModel, logger);

app.get('/', (req, res) => pageController.home(req, res));
app.get('/programs', (req, res) => pageController.programsPage(req, res));
app.get('/about', (req, res) => pageController.aboutPage(req, res));
app.get('/contact', (req, res) => pageController.contactPage(req, res));
app.get('/admin', (req, res) => pageController.adminPage(req, res));

app.post('/admin/program/create', (req, res) => programController.createProgram(req, res));
app.post('/admin/program/delete/:id', (req, res) => programController.deleteProgram(req, res));
app.post('/feedback', (req, res) => programController.createFeedback(req, res));
app.get('/admin/mark-read/:id', (req, res) => programController.markFeedbackRead(req, res));

app.listen(PORT, () => {
    console.log('Server started on http://localhost:' + PORT);
});