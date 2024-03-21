"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.config = void 0;
exports.config = {
    host: undefined,
};
const initialize = ({ config: initConfig, }) => {
    console.log("API INITIALIZED");
    exports.config = Object.assign(Object.assign({}, exports.config), initConfig);
};
exports.initialize = initialize;
