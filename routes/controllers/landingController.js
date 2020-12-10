import { getCommunityDailyReport } from "../../services/dataServices.js";

const landingPage = async({render}) => {
	const day = new Date();
	const yesterday = new Date(day - 86400000);
	const formatDate = day.toISOString().substring(0,10);
	const formatYesterday = yesterday.toISOString().substring(0,10);
	const communityDailyReport = await getCommunityDailyReport(formatDate);
	const communityYesterdayReport = await getCommunityDailyReport(formatYesterday);
	const data = {
		communityMorning: communityDailyReport && communityDailyReport.morning,
		communityEvening: communityDailyReport && communityDailyReport.evening
	};
	const yesterdayData = {
		communityMorning: communityYesterdayReport && communityYesterdayReport.morning,
		communityEvening: communityYesterdayReport && communityYesterdayReport.evening
	};
	if (data.communityMorning && data.communityEvening) {
		data.communityMoodToday = (Number(communityDailyReport.morning + communityDailyReport.evening) / 2);
	} else if (data.communityMorning) {
		data.communityMoodToday = Number(communityDailyReport.morning);
	} else if (data.communityEvening) {
		data.communityMoodToday = Number(communityDailyReport.evening);
	} else {
		data.communityMoodToday = 'No reported mood for today';
	}
	if (yesterdayData.communityMorning && yesterdayData.communityEvening) {
		data.communityMoodYesterday = (Number(communityYesterdayReport.morning + communityYesterdayReport.evening) / 2);
	} else if (yesterdayData.communityMorning) {
		data.communityMoodYesterday = Number(communityYesterdayReport.morning);
	} else if (yesterdayData.communityEvening) {
		data.communityMoodYesterday = Number(communityYesterdayReport.evening);
	} else {
		data.communityMoodYesterday = 'No reported mood for yesterday';
	}
	render('landing.ejs', data);
}

export { landingPage };