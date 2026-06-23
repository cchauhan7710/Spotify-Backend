import dotenv from "dotenv"
import app from "./src/app.js";
import connectingDB from "./src/db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/auth.routes.js";

dotenv.config()

connectingDB();

app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is runnig on the port: ${process.env.PORT}`);
})