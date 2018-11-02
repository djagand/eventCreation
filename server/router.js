import { PingTest } from "./controllers/PingTest";
import { Signup, Login } from "./controllers/Auth";
import {
  CreateEvent,
  DeleteEvent,
  UpdateEvent,
  GetEvents
} from "./controllers/Features";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Too many requests. Please try again later"
});

export const router = app => {
  app.get("/api", PingTest);
  app.post("/api/signup", Signup);
  app.post("/api/login", Login);
  app.post("/api/createevent", apiLimiter, CreateEvent);
  app.post("/api/deleteevent", DeleteEvent);
  app.post("/api/updateevent", UpdateEvent);
  app.get("/api/events", GetEvents);
};
