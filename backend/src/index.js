import { buildDatabase } from "./db/index.js";
import { buildServer } from "./server/index.js";

const Database = buildDatabase();

const Server = buildServer(Database);
Server.start();