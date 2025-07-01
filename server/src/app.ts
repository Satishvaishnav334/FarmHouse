import express from 'express';
import { Server } from 'socket.io';
import routes from './routes/healthRoute';
import cors from "cors";
import http from 'http';

const app = express();
const server = http.createServer(app);
app.use(cors())
const io = new Server(server, {
  cors: {
    origin: process.env.ACCESS_CONTROL_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const corsOptions = {
  origin: process.env.ACCESS_CONTROL_ORIGIN || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use('/', routes);

io.on('connection', (socket) => {
  // define your function
});

// routes
import healthRouter from "./routes/healthRoute"
import userRouter from "./routes/userRoute"

app.use("/api/v1/health", healthRouter)
app.use("/api/v1/users", userRouter)

export default app;