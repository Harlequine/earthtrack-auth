import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import DB_CONNECT from "./src/config/db-connect.js"
import CREATE_TEST_USER from "./src/config/create-test-user.js"
import USER_ROUTES from "./src/routes/user.js"

dotenv.config();
const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", USER_ROUTES);

const PORT = process.env.port || 5001;

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`)
});

DB_CONNECT();
CREATE_TEST_USER();//creates test users in USERS collection for development purposes




