import { getDailyReport, updateMorningReport, addMorningReport, updateEveningReport, addEveningReport } from "../../services/dataServices.js";
import { validateMorning, validateEvening } from '../../middlewares/validations.js';

const homePage = async({ session, render, response }) => {
	const user = await session.get('user');
	if (!user) {
		// this check should be fixed to work better
		response.redirect('/login');
	}
	const day = new Date();
	const yesterday = new Date(day - 86400000);
	const formatDate = day.toISOString().substring(0,10);
	const formatYesterday = yesterday.toISOString().substring(0,10);
	const dailyReport = await getDailyReport(formatDate, user.id);
	const yesterdayReport = await getDailyReport(formatYesterday, user.id);
	const data = {
		user: user,
		morning: dailyReport && dailyReport.morning,
		evening: dailyReport && dailyReport.evening,
	};
	if (data.morning && data.evening) {
		data.moodToday = (Number(dailyReport.morning + dailyReport.evening) / 2);
	} else if (data.morning) {
		data.moodToday = Number(dailyReport.morning);
	} else if (data.evening) {
		data.moodToday = Number(dailyReport.evening);
	} else {
		data.moodToday = 'No reported mood for today';
	}
	if (yesterdayReport.morning && yesterdayReport.evening) {
		data.moodYesterday = (Number(yesterdayReport.morning + yesterdayReport.evening) / 2);
	} else if (yesterdayReport.morning) {
		data.moodYesterday = Number(yesterdayReport.morning);
	} else if (yesterdayReport.evening) {
		data.moodYesterday = Number(yesterdayReport.evening);
	} else {
		data.moodYesterday = 'No reported mood for yesterday';
	}
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
		return;
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

const postMorning = async({session, request, response, render}) => {
	const data = await validateMorning(request);
	// check that logged in
	const user = await session.get('user');
	data.id = user.id;
	if (data.errors) {
		data.user = user;
		const day = new Date();
		const formatDate = day.toISOString().substring(0,10);
		data.date = formatDate;
		const dailyReport = await getDailyReport(formatDate, user.id);
		data.morning = dailyReport && dailyReport.morning;
		data.evening = dailyReport && dailyReport.evening;
		render('morning.ejs', data);
		return;
	}
	const report = await getDailyReport(data.date, user.id);
	if (report) {
		await updateMorningReport(data);
	} else {
		await addMorningReport(data);
	}
	response.redirect('./user/reporting');
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

const postEvening = async({session, request, response, render}) => {
	const data = await validateEvening(request);
	const user = await session.get('user');
	// check that users logged on
	data.id = user.id;
	if (data.errors) {
		data.user = user;
		const day = new Date();
		data.date = day.toISOString().substring(0,10);
		const dailyReport = getDailyReport(data.date, user.id);
		data.morning = dailyReport && dailyReport.morning;
		data.evening = dailyReport && dailyReport.evening;
		render('evening.ejs', data);
		return;
	}
	const report = await getDailyReport(data.date, user.id);
	if(report) {
		await updateEveningReport(data);
	} else {
		await addEveningReport(data);
	}
	response.redirect('./user/reporting');
}

export { homePage, reportMorning, reportEvening, postMorning, postEvening };