import express from "express";
import colors from "colors";
import cors from "cors";
import filter from "content-filter";
import connectDB from "./config/config.db.js";
import { secrets } from "./config/config.secrets.js";
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const blackList = ['$','{','&&','||']
const options = {
    urlBlackList: blackList,
    bodyBlackList: blackList
}

app.use(filter(options))


//connecting to db
connectDB().then(()=>console.log(`DB CONNECTED SUCCESSFULLY`.green.bold.underline));

//importing routes

import userRoutes from "./Users/routes/routes.users.js";
import policiesRoutes from "./Policies/routes/routes.policies.js";
import claimsRoutes from "./Claims/routes/routes.claims.js";

//using routes
app.use("/api/users", userRoutes);

app.use("/api/policies", policiesRoutes);

app.use("/api/claims", claimsRoutes);

const PORT = secrets.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold.underline);
}
)


