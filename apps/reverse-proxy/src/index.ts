import express from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import ngrok from "@ngrok/ngrok";

const app = express();

const server = createServer(app);

server.listen(process.env.REVERSE_PROXY_PORT, () => {
  console.log(
    `Reverse-proxy online: connected to port ${process.env.REVERSE_PROXY_PORT}`
  );

  app.use(
    ["/api"],
    createProxyMiddleware({
      target: `${process.env.REVERSE_PROXY_URL}:${process.env.API_PORT}/`,
      changeOrigin: true,
      pathRewrite: {
        [`^/api`]: "",
      },
    })
  );

  // Allows is to run the js bundle
  app.use(
    ["/index.bundle"],
    (req, res, next) => {
      res.writeHead(200, {
        "Content-Type": "application/javascript; charset=UTF-8",
        "Content-Encoding": "gzip",
      });

      next();
    },
    createProxyMiddleware({
      target: `${process.env.REVERSE_PROXY_URL}:${process.env.WEB_PORT}`,
      changeOrigin: true,
    })
  );

  app.use(
    ["/"],
    createProxyMiddleware({
      target: `${process.env.REVERSE_PROXY_URL}:${process.env.WEB_PORT}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/app`]: "",
      },
    })
  );
});

if (process.env.ENVIRONMENT === "development") {
  (async () => {
    const listener = await ngrok.forward({
      addr: process.env.REVERSE_PROXY_PORT,
      authtoken_from_env: true,
      domain: process.env.NGROK_DOMAIN,
    });

    console.log(`NGROK ingress established at: ${listener.url()}`);
  })();
}
