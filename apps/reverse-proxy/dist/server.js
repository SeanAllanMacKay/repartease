"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const ngrok_1 = __importDefault(require("@ngrok/ngrok"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
server.listen(process.env.REVERSE_PROXY_PORT, () => {
    console.log(`Reverse-proxy online: connected to port ${process.env.REVERSE_PROXY_PORT}`);
    app.use(["/api"], (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: `${process.env.REVERSE_PROXY_URL}:${process.env.API_PORT}/`,
        changeOrigin: true,
        pathRewrite: {
            [`^/api`]: "",
        },
    }));
    // Allows is to run the js bundle
    app.use(["/index.bundle"], (req, res, next) => {
        res.writeHead(200, {
            "Content-Type": "application/javascript; charset=UTF-8",
            "Content-Encoding": "gzip",
        });
        next();
    }, (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: `${process.env.REVERSE_PROXY_URL}:${process.env.WEB_PORT}`,
        changeOrigin: true,
    }));
    app.use(["/"], (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: `${process.env.REVERSE_PROXY_URL}:${process.env.WEB_PORT}`,
        changeOrigin: true,
        pathRewrite: {
            [`^/app`]: "",
        },
    }));
});
if (process.env.ENVIRONMENT === "development") {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const listener = yield ngrok_1.default.forward({
            addr: process.env.REVERSE_PROXY_PORT,
            authtoken_from_env: true,
            domain: process.env.NGROK_DOMAIN,
        });
        console.log(`NGROK ingress established at: ${listener.url()}`);
    }))();
}
