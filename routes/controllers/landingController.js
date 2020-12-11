import { getCommunityDailyReport } from "../../services/dataServices.js";

const landingPage = async({render}) => {
	const day = new Date();
	const yesterday = new Date(day - 86400000);
	const formatDate = day.toISOString().substring(0,10);
	const formatYesterday = yesterday.toISOString().substring(0,10);
	const communityDailyReport = await getCommunityDailyReport(formatDate);
	const communityYesterdayReport = await getCommunityDailyReport(formatYesterday);
	if (communityDailyReport == undefined || communityYesterdayReport == undefined) {
		const data = {
			communityMoodToday: 'No reported mood for today',
			communityMoodYesterday: 'No reported mood for yesterday'
		};
		render('landing.ejs', data);
		return ;
	}
	const data = {
		communityMorning: communityDailyReport[0] && communityDailyReport[0].morning,
		communityEvening: communityDailyReport[0] && communityDailyReport[0].evening
	};
	const yesterdayData = {
		communityMorning: communityYesterdayReport[0] && communityYesterdayReport[0].morning,
		communityEvening: communityYesterdayReport[0] && communityYesterdayReport[0].evening
	};
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
	render('landing.ejs', data);
}

export { landingPage };