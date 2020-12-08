import { Router } from "../deps.js";

import { landingPage } from './controllers/landingController.js';
import { loginPage, postLoginPage, registerPage, postRegisterPage } from './controllers/authController.js';

const router = new Router();

router.get('/', landingPage);
router.get('/login', loginPage);
router.post('/auth/login', postLoginPage);
router.get('/register', registerPage);
router.post('/auth/register', postRegisterPage);

export { router };