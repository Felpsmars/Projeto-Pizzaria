import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers;
    const [, token] = authorization.split(' ');

    if (!authorization) {
      return response.status(401).end();
    }

    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    // recupera id do token e bota em um var no request
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
