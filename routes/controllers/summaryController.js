import { averageWeek, averageMonth } from '../../services/summaryServices.js';
import { weekNumber, getTheDate, checkWeek, checkMonth } from '../../utils/helpers.js';

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

const changeMonthView = async({request, session, render}) => {
	const user = await session.get('user');
	const body = request.body();
	const params = await body.value;
	const setMonth = params.get('month');
	const year = Number(setMonth.substring(0,4));
	const month = Number(setMonth.substring(5,7));
	const endDate = new Date(year, month - 1, 8);
	const week = weekNumber(endDate)[1];

	const monthData = await averageMonth(user.id, month);
	const weekData = await averageWeek(user.id, week);
	
	const formatWeek = checkWeek(week);
	const formatMonth = checkMonth(month);

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

const changeWeekView = async({request, session, render}) => {
	const user = await session.get('user');
	const body = request.body();
	const params = await body.value;
	const setWeek = params.get('week');
	const year = Number(setWeek.substring(0,4));
	const week = Number(setWeek.substring(6,8));
	const weekStartDate = getTheDate(week, year);
	const month = weekStartDate.getMonth() + 1;
	const monthData = await averageMonth(user.id, month);
	const weekData = await averageWeek(user.id, week);

	const formatWeek = checkWeek(week);
	const formatMonth = checkMonth(month);
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

export { summaryPage, changeMonthView, changeWeekView };