import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "postgres",
	synchronize: true,
	logging: "all",
	entities: ["src/entity/*.{js,ts}"],
});
