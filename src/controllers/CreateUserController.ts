import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body;

    const service = new CreateUserService();

    const result = await service.execute({ name, email, password, admin });

    return response.json(result);
  }
}

export default new CreateUserController();