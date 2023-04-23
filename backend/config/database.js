import dotenv from "dotenv";

dotenv.config();

export const database = {
	dialect: "postgres",
	host: "localhost",
	port: 5432,
	database: "projnode",
	username: "postgres",
	password: process.env.POSTGRES_PASSWORD,
};
