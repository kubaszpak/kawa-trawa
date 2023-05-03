import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.PGHOST || "localhost",
	port: Number(process.env.PGPORT) || 5432,
	username: process.env.PGUSER || "postgres",
	password: process.env.PGPASSWORD || "postgres",
	database: process.env.PGDATABASE || "postgres",
	synchronize: !process.env.PGHOST,
	logging: true,
	entities: ["src/entity/*.{js,ts}"],
});
