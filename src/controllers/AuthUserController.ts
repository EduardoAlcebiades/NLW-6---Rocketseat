import { Request, Response } from "express";

import { AuthUserService } from "../services/AuthUserService";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const service = new AuthUserService();

    const result = await service.execute({ email, password });

    return response.json(result);
  }
}

export default new AuthUserController();
