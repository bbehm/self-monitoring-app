import { getDailyReport, updateMorningReport, addMorningReport, updateEveningReport, addEveningReport, getCommunityDailyReport } from "../../services/dataServices.js";
import { validateMorning, validateEvening } from '../../middlewares/validations.js';

const homePage = async({ session, render, response }) => {
	const user = await session.get('user');
	const day = new Date();
	const yesterday = new Date(day - 86400000);
	const formatDate = day.toISOString().substring(0,10);
	const formatYesterday = yesterday.toISOString().substring(0,10);
	const dailyReport = await getDailyReport(formatDate, user.id);
	const yesterdayReport = await getDailyReport(formatYesterday, user.id);
	const communityDailyReport = await getCommunityDailyReport(formatDate);
	const communityYesterdayReport = await getCommunityDailyReport(formatYesterday);
	if (communityDailyReport == undefined || communityYesterdayReport == undefined) {
		const data = {
			user: user,
			morning: dailyReport && dailyReport.morning,
			evening: dailyReport && dailyReport.evening,
			yesterdayMorning: yesterdayReport && yesterdayReport.morning,
			yesterdayEvening: yesterdayReport && yesterdayReport.evening,
			communityMoodToday: 'No reported mood for today',
			communityMoodYesterday: 'No reported mood for yesterday',
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
		if (data.yesterdayMorning && data.yesterdayEvening) {
			data.moodYesterday = (Number(yesterdayReport.morning + yesterdayReport.evening) / 2);
		} else if (data.yesterdayMorning) {
			data.moodYesterday = Number(yesterdayReport.morning);
		} else if (data.yesterdayEvening) {
			data.moodYesterday = Number(yesterdayReport.evening);
		} else {
			data.moodYesterday = 'No reported mood for yesterday';
		}
		render('home.ejs', data);
		return ;
	}
	const data = {
		user: user,
		morning: dailyReport && dailyReport.morning,
		evening: dailyReport && dailyReport.evening,
		communityMorning: communityDailyReport[0] && communityDailyReport[0].morning,
		communityEvening: communityDailyReport[0] && communityDailyReport[0].evening
	};
	const yesterdayData = {
		user: user,
		morning: yesterdayReport && yesterdayReport.morning,
		evening: yesterdayReport && yesterdayReport.evening,
		communityMorning: communityYesterdayReport[0] && communityYesterdayReport[0].morning,
		communityEvening: communityYesterdayReport[0] && communityYesterdayReport[0].evening
	};
	//current user
	if (data.morning && data.evening) {
		data.moodToday = (Number(dailyReport.morning + dailyReport.evening) / 2);
	} else if (data.morning) {
		data.moodToday = Number(dailyReport.morning);
	} else if (data.evening) {
		data.moodToday = Number(dailyReport.evening);
	} else {
		data.moodToday = 'No reported mood for today';
	}
	if (yesterdayData.morning && yesterdayData.evening) {
		data.moodYesterday = (Number(yesterdayReport.morning + yesterdayReport.evening) / 2);
	} else if (yesterdayData.morning) {
		data.moodYesterday = Number(yesterdayReport.morning);
	} else if (yesterdayData.evening) {
		data.moodYesterday = Number(yesterdayReport.evening);
	} else {
		data.moodYesterday = 'No reported mood for yesterday';
	}
	//community
	if (data.communityMorning && data.communityEvening) {
		data.communityMoodToday = ((Number(communityDailyReport[0].morning) + Number(communityDailyReport[0].evening)) / 2);
	} else if (data.communityMorning) {
		data.communityMoodToday = Number(communityDailyReport[0].morning);
	} else if (data.communityEvening) {
		data.communityMoodToday = Number(communityDailyReport[0].evening);
	} else {
		data.communityMoodToday = 'No reported mood for today';
	}
	if (yesterdayData.communityMorning && yesterdayData.communityEvening) {
		data.communityMoodYesterday = ((Number(communityYesterdayReport[0].morning) + Number(communityYesterdayReport[0].evening)) / 2);
	} else if (yesterdayData.communityMorning) {
		data.communityMoodYesterday = Number(communityYesterdayReport[0].morning);
	} else if (yesterdayData.communityEvening) {
		data.communityMoodYesterday = Number(communityYesterdayReport[0].evening);
	} else {
		data.communityMoodYesterday = 'No reported mood for yesterday';
	}
	render('home.ejs', data);
}

const reportMorning = async({session, render}) => {
	const user = await session.get('user');
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
	response.redirect('/behavior/reporting');
}

const reportEvening = async({session, render}) => {
	const user = await session.get('user');
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
	response.redirect('/behavior/reporting');
}

export { homePage, reportMorning, reportEvening, postMorning, postEvening };