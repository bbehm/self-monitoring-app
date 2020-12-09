import { averageWeek, averageMonth } from '../../services/summaryServices.js';

const weekNumber = (day) => {
    day = new Date(Date.UTC(day.getUTCFullYear(), day.getMonth(), day.getDate()));
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(day.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (day - yearStart) / 86400000) + 1)/7);
    return [day.getUTCFullYear(), weekNo];
}

const checkWeek = (week) => {
	if (week.length > 1) {
		return(week);
	} else {
		return(week > 9 ? week : "0" + week);
	}
}

const checkMonth = (month) => {
	if (month.length > 1) {
		return(month);
	} else {
		return(month > 9 ? month : "0" + month);
	}
}

const summaryPage = async({session, render}) => {
	const user = await session.get('user');
	const day = new Date();
	
	const month = day.getMonth() > 0 ? day.getMonth() : 12;
	const formatMonth = checkMonth(month);
	const monthData = await averageMonth(user.id, month);
	
	const week = weekNumber(day)[1] - 1; 
	const formatWeek = checkWeek(week);
	const weekData = await averageWeek(user.id, week);
	
	if (monthData) {
		if (weekData) {
			render('summary.ejs', {user: user, monthData: monthData, month: formatMonth, weekData: weekData, week: formatWeek});
		} else {
			render('summary.ejs', {user: user, monthData: monthData, month: formatMonth, weekData: [], week: formatWeek});
		}
	} else if (weekData) {
		render('summary.ejs', {user: user, monthData: [], month: formatMonth, weekData: weekData, week: formatWeek});
	} else {
		render('summary.ejs', {user:user, monthData: [], month: formatMonth, weekData: [], week: formatWeek});
	}
}

const changeMonthView = async({}) => {

}

const changeWeekView = async({}) => {

}

export { summaryPage, changeMonthView, changeWeekView };