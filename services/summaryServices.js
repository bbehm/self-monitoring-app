import { executeQuery } from "../database/database.js";

const averageWeek = async(id, month) => {
	const query = "SELECT DISTINCT EXTRACT(WEEK FROM date::timestamp) AS week, AVG(sleepduration) AS sleepDurationAvg, ROUND(AVG(sleepquality), 2) AS sleepQualityAvg, AVG(exercisetime) as exerciseAvg, AVG(studytime) AS studyTimeAvg, ROUND(AVG((morning + evening) / 2), 2) AS moodAvg FROM user_reports WHERE user_id=$1 AND EXTRACT(Month FROM date::timestamp)=$2 GROUP BY week;";
	const res = await executeQuery(query, id, month);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	}
	return;
}

const averageMonth = async(id, month) => {
	const query = "SELECT DISTINCT EXTRACT(Month FROM date::timestamp) AS month, AVG(sleepduration) AS sleepDurationAvg, ROUND(AVG(sleepquality), 2) AS sleepQualityAvg, AVG(exercisetime) as exerciseAvg, AVG(studytime) AS studyTimeAvg, ROUND(AVG((morning + evening) / 2), 2) AS moodAvg FROM user_reports WHERE user_id=$1 AND EXTRACT(Month FROM date::timestamp)=$2 GROUP BY month;";
	const res = await executeQuery(query, id, month);
	if (res && res.rowCount > 0) {
		return res.rowsOfObjects();
	}
	return;
}

export { averageMonth, averageWeek };