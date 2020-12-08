import { executeQuery } from "../database/database.js";

const getUserFromEmail = async(email) => {
	const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
	return res;
}

const addUser = async(email, hash) => {
	await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
}

export { getUserFromEmail, addUser };