import { prismaClient } from "../prisma";

class CreateTagService {
  async execute(name: string) {
    if (!name.trim()) throw new Error("Invalid name");

    const tagExists = await prismaClient.tag.findFirst({
      where: { name },
    });

    if (tagExists) throw new Error(`Tag '${name}' already exists`);

    const tag = await prismaClient.tag.create({
      data: {
        name,
      },
    });

    return tag;
  }
}

export { CreateTagService };
