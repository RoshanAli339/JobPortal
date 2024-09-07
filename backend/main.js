import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

const app = express();

// as we return JSON from the API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for implementing JWT
app.use(cookieParser());

// for cross-origin policy
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);

app.get("/test", (req, res) => {
    return res.status(200).json({
        message: "Its working fine",
        success: true
    })
})


app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server started on port ${process.env.PORT}`);
})