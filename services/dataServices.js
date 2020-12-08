import { executeQuery } from "../database/database.js";

const getDailyReport = async(date, id) => {
	const res = await executeQuery("SELECT * FROM user_reports WHERE date=$1 AND user_id=$2;", date, id);
	if(res && res.rowCount > 0) {
		return res.rowsOfObjects()[0];
	}
	return ;
}

const updateMorningReport = async(data) => {
	await executeQuery("UPDATE user_reports SET sleepDuration=$1, sleepQuality=$2, morning=$3 WHERE date=$4 AND user_id=$5;", data.sleepDuration, data.sleepQuality, data.morningMood, data.date, data.id);
}

const addMorningReport = async(data) => {
	await executeQuery("INSERT INTO user_reports (date, sleepDuration, sleepQuality, morning, user_id) VALUES ($1, $2, $3, $4, $5);", data.date, data.sleepDuration, data.sleepQuality, data.morningMood, data.id);
}

const updateEveningReport = async(data) => {
	await executeQuery("UPDATE user_reports SET exerciseTime=$1, studyTime=$2, eating=$3, evening=$4 WHERE date=$5 AND user_id=$6;", data.exerciseTime, data.studyTime, data.eating, data.eveningMood, data.date, data.id);
}

const addEveningReport = async(data) => {
	await executeQuery("INSERT INTO user_reports (date, exerciseTime, studyTime, eating, evening, user_id) VALUES ($1, $2, $3, $4, $5, $6;", data.date, data.exerciseTime, data.studyTime, data.eating, data.eveningMood, data.id);
}

export { getDailyReport, updateMorningReport, addMorningReport, updateEveningReport, addEveningReport };