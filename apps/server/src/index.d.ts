declare global {
  namespace Express {
    interface Request {
      io?: any;
    }
  }
}
