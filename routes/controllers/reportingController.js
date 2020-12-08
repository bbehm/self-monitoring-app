import { getDailyReport } from "../../services/dataServices.js";

const homePage = async({ session, render, response }) => {
	const user = await session.get('user');
	if (!user) {
		// this check should be fixed to work better
		response.redirect('/login');
	}
	const day = new Date();
	const formatDate = day.toISOString().substring(0,10);
	const dailyReport = await getDailyReport(formatDate, user.id);
	const data = {
		user: user,
		morning: dailyReport && dailyReport.morning,
		evening: dailyReport && dailyReport.evening
	};
	render('home.ejs', data);
}

const reportMorning = async({session, render}) => {
	const user = await session.get('user');
	// add logged in check
	const day = new Date();
	const formatDate = day.toISOString().substring(0,10);
	const dailyReport = await getDailyReport(formatDate, user.id);
	const data = {
		user: user,
		date: formatDate,
		sleepDuration: 0,
		sleepQuality: 1,
		morningMood: 1,
		morning: false,
		evening: false,
		errors: {}
	}
	if (!dailyReport) {
		render('morning.ejs', data);
	}
	const morningData = {
		user: user,
		date: formatDate,
		sleepDuration: (dailyReport.sleepDuration || 0),
		sleepQuality: (dailyReport.sleepQuality || 1),
		morningMood: (dailyReport.morningMood || 1),
		morning: dailyReport && dailyReport.morning,
		evening: dailyReport && dailyReport.evening,
		errors: {}
	}
	render('morning.ejs', morningData)
}

const reportEvening = async({session, render}) => {
	const user = await session.get('user');
	// add logged in check
	const day = new Date();
	const formatDate = day.toISOString().substring(0,10);
	const dailyReport = await getDailyReport(formatDate, user.id);
	const data = {
		user: user,
		date: formatDate,
		exerciseTime: 0,
		studyTime: 0,
		eating: 1,
		eveningMood: 1,
		morning: false,
		evening: false,
		errors: {}
	}
	if (!dailyReport) {
		render('evening.ejs', data);
	}
	const eveningData = {
		user: user,
		date: formatDate,
		exerciseTime: (dailyReport.exerciseTime || 0),
		studyTime: (dailyReport.studyTime || 0),
		eating: (dailyReport.eating || 1),
		eveningMood: (dailyReport.eveningMood || 1),
		morning: dailyReport && dailyReport.morning,
		evening: dailyReport && dailyReport.evening,
		errors: {}
	}
	render('evening.ejs', eveningData)
}

export { homePage, reportMorning, reportEvening };