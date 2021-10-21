import { hashSync } from "bcryptjs";
import { prismaClient } from "../prisma";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin }: IUserRequest) {
    if (!email) throw new Error("Invalid email");

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userAlreadyExists) throw new Error(`Email '${email}' already exists`);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 8),
        admin,
      },
    });

    return user;
  }
}

export { CreateUserService };
