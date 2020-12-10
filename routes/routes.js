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

router.get('/user/reporting', homePage);
router.get('/user/reporting/morning', reportMorning);
router.post('/user/reporting/morning', postMorning);
router.get('/user/reporting/evening', reportEvening);
router.post('/user/reporting/evening', postEvening);

router.get('/user/summary', summaryPage); //need to change
router.post('/user/summary/week', changeWeekView);
router.post('/user/summary/month', changeMonthView);


export { router };