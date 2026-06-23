import express from "express"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import musicRoute  from "./routes/music.route.js";


const app = express();


app.use(cookieParser());
app.use(express.json());


app.use("/api/auth",authRouter)
app.use("/api/music/",musicRoute)





export default app;