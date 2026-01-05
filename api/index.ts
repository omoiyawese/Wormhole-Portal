import express from "express";
import { registerRoutes } from "../server/routes";
import { setupVite, serveStatic, log } from "../server/vite";
import http from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let resBody: any = undefined;
  const oldJson = res.json;
  res.json = function (body) {
    resBody = body;
    return oldJson.apply(res, arguments as any);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (resBody) {
        logLine += ` :: ${JSON.stringify(resBody)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });
  next();
});

const server = http.createServer(app);
registerRoutes(server, app).then(() => {
  if (process.env.NODE_ENV !== "production") {
    setupVite(app, server);
  } else {
    serveStatic(app);
  }
});

export default app;
