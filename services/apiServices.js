import { executeQuery } from "../database/database.js";

const getSpecificDay = async(date) => {
	const query = "SELECT DISTINCT date, AVG(sleepduration) AS sleepduration_avg, ROUND((AVG(sleepquality)), 2) AS sleepquality_avg, AVG(exercisetime) AS exercisetime_avg, AVG(studytime) AS studytime_avg, AVG(eating) AS eating_avg, ROUND(AVG((morning+evening)/2), 2) AS mood_avg FROM user_reports WHERE date=$1 GROUP BY date;";
	const res = await executeQuery(query, date);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	} else {
		console.log('No data found for the selected day');
		return;
	}
}

const getOneWeek = async(start, end) => {
	const query = "SELECT DISTINCT (date >= $1 AND date <= $2) AS week, AVG(sleepduration) AS sleepduration_avg, ROUND((AVG(sleepquality)), 2) AS sleepquality_avg, AVG(exercisetime) AS exercisetime_avg, AVG(studytime) AS studytime_avg, AVG(eating) AS eating_avg, ROUND(AVG((morning+evening)/2), 2) AS mood_avg FROM user_reports WHERE date >= $1 AND date <= $2 GROUP BY week;";
	const res = await executeQuery(query, start, end);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	} else {
		console.log('No data found for the selected week');
		return;
	}
}

export { getOneWeek, getSpecificDay };