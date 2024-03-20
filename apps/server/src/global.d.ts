import { pusher } from "@services/sockets";

declare global {
  namespace Express {
    interface Request {
      pusher?: typeof pusher;
      user?: any;
    }
  }
}
