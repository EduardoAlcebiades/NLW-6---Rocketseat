import "dotenv/config";
import "express-async-errors"

import { app } from "./app";

const port = process.env.APP_PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
