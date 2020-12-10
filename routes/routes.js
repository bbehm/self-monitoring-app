import { Router } from "../deps.js";

import { landingPage } from './controllers/landingController.js';
import { loginPage, postLoginPage, registerPage, postRegisterPage, logOut } from './controllers/authController.js';
import { homePage, reportMorning, reportEvening, postMorning, postEvening } from './controllers/reportingController.js';
import { summaryPage, changeWeekView, changeMonthView } from './controllers/summaryController.js';
const router = new Router();

router.get('/', landingPage);
router.get('/auth/login', loginPage);
router.post('/auth/login', postLoginPage);
router.get('/auth/registration', registerPage);
router.post('/auth/registration', postRegisterPage);
router.post('/auth/logout', logOut);

router.get('/behavior/reporting', homePage);
router.get('/behavior/reporting/morning', reportMorning);
router.post('/behavior/reporting/morning', postMorning);
router.get('/behavior/reporting/evening', reportEvening);
router.post('/behavior/reporting/evening', postEvening);

router.get('/behavior/summary', summaryPage); //need to change
router.post('/behavior/summary/week', changeWeekView);
router.post('/behavior/summary/month', changeMonthView);


export { router };