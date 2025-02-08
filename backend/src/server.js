import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./Database/connection.js";

dotenv.config({ 
    path: "./config.env" 
});

dbConnection();

app.listen(process.env.PORT, () => console.log("Your app is listening on port: ", process.env.PORT));
