import { Router } from "../deps.js";

import { landingPage } from './controllers/homeController.js';

const router = new Router();

router.get('/', landingPage);

export { router };