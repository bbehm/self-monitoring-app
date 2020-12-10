import { executeQuery } from "../database/database.js";

const averageWeek = async(id, week) => {
	const query = "SELECT DISTINCT EXTRACT(WEEK FROM date::timestamp) AS week, ROUND(AVG(sleepduration)::numeric, 2) AS sleepdurationavg, ROUND(AVG(sleepquality)::numeric, 2) AS sleepqualityavg, ROUND(AVG(exercisetime)::numeric, 2) AS exerciseavg, ROUND(AVG(studytime)::numeric, 2) AS studytimeavg, ROUND(AVG((morning + evening) / 2), 2) AS moodavg FROM user_reports WHERE user_id=$1 AND EXTRACT(WEEK FROM date::timestamp)=$2 GROUP BY week;";
	const res = await executeQuery(query, id, week);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	}
	return;
}

const averageMonth = async(id, month) => {
	const query = "SELECT DISTINCT EXTRACT(MONTH FROM date::timestamp) AS month, ROUND(AVG(sleepduration)::numeric, 2) AS sleepdurationavg, ROUND(AVG(sleepquality)::numeric, 2) AS sleepqualityavg, ROUND(AVG(exercisetime)::numeric, 2) AS exerciseavg, ROUND(AVG(studytime)::numeric, 2) AS studytimeavg, ROUND(AVG((morning + evening) / 2), 2) AS moodavg FROM user_reports WHERE user_id=$1 AND EXTRACT(MONTH FROM date::timestamp)=$2 GROUP BY month;";
	const res = await executeQuery(query, id, month);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	}
	return;
}

export { averageMonth, averageWeek };