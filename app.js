import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

//rest api Deployment
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.z5k1vat.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(5000, () =>
            console.log("Connected To Database And Server is running")
        )
    )
    .catch((e) => console.log(e));
