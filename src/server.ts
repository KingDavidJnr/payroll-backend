import app from "./app";
import { appConfig, dbConfig } from "./config";
import database from "./database";

// start up server
app.listen(appConfig.PORT, () => {
  console.log(`server running on http://${appConfig.HOST}:${appConfig.PORT}`);
  database.connect(dbConfig.DATABASE_URI); //connection to database
});
