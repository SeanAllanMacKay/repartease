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
const express_1 = require("express");
const auth_1 = require("../../../services/auth");
const games_1 = require("../../../actions/games");
const players_1 = __importDefault(require("./players"));
const close_responses_1 = __importDefault(require("./close-responses"));
const select_winner_1 = __importDefault(require("./select-winner"));
const start_game_1 = __importDefault(require("./start-game"));
const submit_response_1 = __importDefault(require("./submit-response"));
const router = (0, express_1.Router)({ mergeParams: true });
router
    .route("/")
    .get(auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameCode } = req.params;
        const { user } = req;
        const { status, message, game } = yield (0, games_1.getGame)({
            gameCode,
            playerId: user._id,
        });
        res.status(status).send({ message, game });
    }
    catch (caught) {
        const { error = "There was an error fetching this game", status = 500 } = caught;
        res.status(status).send({ error });
    }
}));
router.use("/players", players_1.default);
router.use("/close-responses", close_responses_1.default);
router.use("/select-winner", select_winner_1.default);
router.use("/start-game", start_game_1.default);
router.use("/submit-response", submit_response_1.default);
exports.default = router;
