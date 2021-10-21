import { prismaClient } from "../prisma";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: IAuthRequest) {
    if (!email || !password) throw new Error("Data is missing");

    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user || !compareSync(password, user.password))
      throw new Error("E-mail or password incorrect");

    const token = sign({ email: user.email }, process.env.APP_KEY, {
      subject: user.id,
      expiresIn: "1d",
    });

    return { token, prefix: "Bearer" };
  }
}

export { AuthUserService };
