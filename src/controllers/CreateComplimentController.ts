import { Request, Response } from "express";

import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver_id, message } = request.body;

    const service = new CreateComplimentService();

    const result = await service.execute({
      tag_id,
      user_sender_id: request.auth.user_id,
      user_receiver_id,
      message,
    });

    return response.json(result);
  }
}

export default new CreateComplimentController();
