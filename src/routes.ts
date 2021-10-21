import { Router } from "express";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import CreateTagController from "./controllers/CreateTagController";
import CreateUserController from "./controllers/CreateUserController";
import AuthUserController from "./controllers/AuthUserController";
import CreateComplimentController from "./controllers/CreateComplimentController";
import ComplimentListController from "./controllers/ComplimentListController";

const routes = Router();

routes.post("/login", AuthUserController.handle);
routes.post("/user", CreateUserController.handle);
routes.post(
  "/tag",
  ensureAuthenticated,
  ensureAdmin,
  CreateTagController.handle
);
routes.get(
  "/compliment/my_sends",
  ensureAuthenticated,
  ComplimentListController.mySends
);
routes.get(
  "/compliment/my_receives",
  ensureAuthenticated,
  ComplimentListController.myReceives
);
routes.post(
  "/compliment",
  ensureAuthenticated,
  CreateComplimentController.handle
);

export { routes };
