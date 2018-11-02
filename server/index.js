import bodyParser from "body-parser";
import express from "express";
import http from "http";
import path from "path";
import { router } from "./router";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
router(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.event_creation_port || 5000;
let server = http.createServer(app);
server.listen(port, () => {
  console.log(`App started in port ${port}`);
});

export default server;
