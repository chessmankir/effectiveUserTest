"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use("/api/auth", auth_router_1.default);
app.use("/api/users", user_routes_1.default);
app.get("/", (_, res) => {
    res.json({
        ok: true,
        message: "Hi effective mobile"
    });
});
exports.default = app;
