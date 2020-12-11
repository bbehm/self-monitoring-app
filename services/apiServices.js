import { executeQuery } from "../database/database.js";

const getSpecificDay = async(date) => {
	const query = "SELECT ROUND(AVG(sleepduration)::numeric, 2) AS sleepduration_avg, ROUND((AVG(sleepquality)), 2) AS sleepquality_avg, ROUND(AVG(exercisetime)::numeric, 2) AS exercisetime_avg, ROUND(AVG(studytime)::numeric, 2) AS studytime_avg, ROUND(AVG(eating)::numeric, 2) AS eating_avg, ROUND(AVG((morning+evening)/2), 2) AS mood_avg FROM user_reports WHERE date=$1;";
	const res = await executeQuery(query, date);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	} else {
		console.log('No data found for the selected day');
		return;
	}
}

const getOneWeek = async(start, end) => {
	const query = "SELECT ROUND(AVG(sleepduration)::numeric, 2) AS sleepduration_avg, ROUND((AVG(sleepquality)), 2) AS sleepquality_avg, ROUND(AVG(exercisetime)::numeric, 2) AS exercisetime_avg, ROUND(AVG(studytime)::numeric, 2) AS studytime_avg, ROUND(AVG(eating)::numeric, 2) AS eating_avg, ROUND(AVG((morning+evening)/2), 2) AS mood_avg FROM user_reports WHERE date >= $1 AND date <= $2;";
	const res = await executeQuery(query, start, end);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	} else {
		console.log('No data found for the selected week');
		return;
	}
}

export { getOneWeek, getSpecificDay };