import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.router";
import userRoutes from "./modules/users/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth", authRouter);
app.post("/api/users", userRoutes);

app.get("/", (_, res) => {
    res.json({
        ok: true,
        message: "Hi effective mobile"
    });
});

export default app;