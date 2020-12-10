import { validate, required, isNumber, minLength, minNumber, isEmail, numberBetween } from '../deps.js';

const morningRules = {
	sleepQuality: [required, isNumber, numberBetween(1,5)],
	morningMood: [required, isNumber, numberBetween(1,5)],
	sleepDuration: [required, isNumber, minNumber(0)]
}

const eveningRules = {
	eveningMood: [required, isNumber, numberBetween(1,5)],
	studyTime: [required, isNumber, minNumber(0)],
	exerciseTime: [required, isNumber, minNumber(0)],
	eating: [required, isNumber, numberBetween(1,5)]
}

const registrationRules = {
	email: [required, isEmail],
	password: [required, minLength(4)],
	verification: [required]
};

const validateRegistration = async(request) => {
	const data = {
		email: '',
		password: '',
		verification: '',
		errors: {}
	};
	if (request) {
		const body = request.body();
		const params = await body.value;
		data.email = params.get('email');
		data.password = params.get('password');
		data.verification = params.get('verification');
	}
	const [passes, errors] = await validate(data, registrationRules);
	if (!passes) {
		data.errors = errors;
	}
	return data;
}

const validateMorning = async(request) => {
	const data = {
		date: '',
		sleepDuration:'',
		sleepQuality:'',
		morningMood: '',
	  }
	  if (request) {
		const body = request.body();
		const params = await body.value;
		data.date = params.get('date').substring(0,10);
		data.sleepDuration = Number(params.get('sleepDuration'));
		data.sleepQuality = Number(params.get('sleepQuality'));
		data.morningMood = Number(params.get('morningMood'));
	  }
	  const [passes, errors] = await validate(data, morningRules);
	  if (!passes) {
		  data.errors = errors;
	  }
	  return data;
}

const validateEvening = async(request) => {
	const data = {
		date: '',
		exerciseTime: '',
		studyTime: '',
		eating: '',
		eveningMood: ''
	}
	if (request) {
		const body = request.body();
		const params = await body.value;
		data.date = params.get('date').substring(0,10);
		data.exerciseTime = Number(params.get('exerciseTime'));
		data.studyTime = Number(params.get('studyTime'));
		data.eating = Number(params.get('eating'));
		data.eveningMood = Number(params.get('eveningMood'));
	}
	const [passes, errors] = await validate(data, eveningRules);
	if (!passes) {
		data.errors = errors;
	}
	return data;
}

export { validateMorning, validateEvening, validateRegistration };