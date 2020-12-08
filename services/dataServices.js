import { executeQuery } from "../database/database.js";

const getDailyReport = async(date, id) => {
	const res = await executeQuery("SELECT * FROM user_reports WHERE date=$1 AND user_id=$2;", date, id);
	if(res && res.rowCount > 0) {
		return res.rowsOfObjects()[0];
	}
	return ;
}

export { getDailyReport };