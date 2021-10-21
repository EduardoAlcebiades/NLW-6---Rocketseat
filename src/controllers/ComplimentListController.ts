import { Request, Response } from "express";
import { ComplimentListService } from "../services/ComplimentListService";

class ComplimentListController {
  async myReceives(request: Request, response: Response) {
    const { user_id } = request.auth;

    const services = new ComplimentListService();

    const result = await services.receivedByUser(user_id);

    return response.json(result);
  }

  async mySends(request: Request, response: Response) {
    const { user_id } = request.auth;

    const services = new ComplimentListService();

    const result = await services.sendedByUser(user_id);

    return response.json(result);
  }
}

export default new ComplimentListController();
