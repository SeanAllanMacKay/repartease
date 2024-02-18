import { auth as auth0 } from "express-oauth2-jwt-bearer";

export const auth = auth0({
  audience: "{yourApiIdentifier}",
  issuerBaseURL: `https://{yourDomain}/`,
});
