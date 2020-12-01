import { Client } from "../deps.js";
import { dbconfig } from "../config/config.js";

const getClient = () => {
	const DATABASE_URL = Deno.env.toObject().DATABASE_URL;
	if(DATABASE_URL) {
	  const client = new Client(DATABASE_URL);
	  return client;
	}
	return new Client(dbconfig.database);
  }
  
  const getPort = () => {
	let port = 7777;
	if (Deno.args.length > 0) {
	  const lastArgument = Deno.args[Deno.args.length - 1];
	  port = Number(lastArgument);
	}
	return port;
  }
  
  const executeQuery = async(query, ...args) => {
	const client = getClient();
	try {
	  await client.connect();
	  return await client.query(query, ...args);
	} catch (e) {
	  console.log(e);
	} finally {
	  await client.end();
	}
  }
  
  export { executeQuery, getPort };
  