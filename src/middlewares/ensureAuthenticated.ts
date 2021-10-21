import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

interface IPayload extends JwtPayload {
  sub: string;
  email: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) return response.status(401).json({ error: "Invalid token" });

  const [, token] = authToken.split(" ");

  const { email, sub: user_id } = verify(
    token,
    process.env.APP_KEY
  ) as IPayload;

  request.auth = { user_id, email };

  return next();
}
