import { getOneWeek, getSpecificDay } from "../../services/apiServices.js";
import { checkMonth, checkWeek } from "../../utils/dateFormatting.js";

const apiWeekSummary = async({response}) => {
	const today = new Date();
	const end = today.toISOString().substring(0,10);
	today.setDate(today.getDate() - 7);
	const start = today.toISOString().substring(0,10);
	const data = await getOneWeek(start, end);
	if (data) {
		response.body = data[0];
		response.status = 200;
	} else {
		response.body = 'No data found for the past week';
		response.status = 404;
	}
}

const apiDaySummary = async({response, params}) => {
	const month = checkMonth(params.month);
	const day = checkWeek(params.day);
	const formatDate = `${params.year}-${month}-${day}`;
	const data = await getSpecificDay(formatDate);
	if (data && Array.isArray(data)) {
		response.body = data;
		response.status = 200;
	} else {
		response.body = 'No data found for the selected day';
		response.status = 404;
	}
}

export { apiDaySummary, apiWeekSummary };