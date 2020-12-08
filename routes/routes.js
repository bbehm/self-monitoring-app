import { Router } from "../deps.js";

import { landingPage } from './controllers/landingController.js';
import { loginPage, postLoginPage, registerPage, postRegisterPage } from './controllers/authController.js';
import { homePage, reportMorning, reportEvening } from './controllers/reportingController.js';
import { summaryPage } from './controllers/summaryController.js';
const router = new Router();

router.get('/', landingPage);
router.get('/login', loginPage);
router.post('/auth/login', postLoginPage);
router.get('/register', registerPage);
router.post('/auth/register', postRegisterPage);

router.get('/user/reporting', homePage);
router.get('/user/reporting/morning', reportMorning);
router.get('/user/reporting/evening', reportEvening);

router.get('/user/summary', summaryPage); //need to change

export { router };