import jwt from "jsonwebtoken";

const JWT_PASSPHRASE: string = process.env["JWT_PASSPHRASE"] || "";

export const MAX_AGE = 86400;

export const auth = {
  sign: (payload: any) => {
    return jwt.sign(payload, JWT_PASSPHRASE, { expiresIn: MAX_AGE });
  },
  verify: (token: any) => {
    try {
      return jwt.verify(token, JWT_PASSPHRASE);
    } catch (err) {
      return false;
    }
  },
  decode: (token: any) => {
    return jwt.decode(token);
  },
};

export * from "./verify-token";
