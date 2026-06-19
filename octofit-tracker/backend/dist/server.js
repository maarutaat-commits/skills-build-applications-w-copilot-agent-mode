"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`Connected to MongoDB at ${mongoUri}`);
    }
    catch (error) {
        console.warn('MongoDB connection failed. Continuing with API scaffold only.');
        console.warn(error);
    }
    app_1.default.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
    });
}
void startServer();
