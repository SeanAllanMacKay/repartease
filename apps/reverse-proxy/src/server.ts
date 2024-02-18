import express from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const server = createServer(app);

server.listen(process.env.REVERSE_PROXY_PORT, () => {
  console.log(
    `Server online: connected to port ${process.env.REVERSE_PROXY_PORT}`,
  );

  app.get("/", (_req: any, res: any) => {
    res.redirect("/app");
  });

  app.use(
    ["/api", "/socket.io"],
    createProxyMiddleware({
      target: `${process.env.API_URL}:${process.env.API_PORT}/`,
      changeOrigin: true,
      pathRewrite: {
        [`^/api`]: "",
      },
    }),
  );

  app.use(
    ["/app"],
    createProxyMiddleware({
      target: `${process.env.WEB_URL}:${process.env.WEB_PORT}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/app`]: "",
      },
    }),
  );
});
