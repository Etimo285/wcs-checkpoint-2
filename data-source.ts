import { DataSource } from "typeorm";
import { Country } from "./Country";

// SQLite DataSource
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "countries.sqlite",
    synchronize: true,
    entities: [Country],
});

export default AppDataSource;