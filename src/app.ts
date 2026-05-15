import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.router";
import userRoutes from "./modules/users/user.routes";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);

app.get("/", (_, res) => {
    res.json({
        ok: true,
        message: "Hi effective mobile"
    });
});

export default app;