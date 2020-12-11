const weekNumber = (day) => {
    day = new Date(Date.UTC(day.getUTCFullYear(), day.getMonth(), day.getDate()));
    day.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(day.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (day - yearStart) / 86400000) + 1)/7);
    return [day.getUTCFullYear(), weekNo];
}

const getTheDate = (week, year) => {
	var date = new Date(year, 0, 1 + (week - 1) * 7);
	var weekDay = date.getDay();
	var result = date;
	if (weekDay <= 4) {
		result.setDate(date.getDate() - date.getDay() + 1);
	} else {
		result.setDate(date.getDate() + 8 - date.getDay());
	}
	return result;
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

export { weekNumber, getTheDate, checkMonth, checkWeek };