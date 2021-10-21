import { prismaClient } from "../prisma";

interface IComplimentRequest {
  tag_id: string;
  user_sender_id: string;
  user_receiver_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender_id,
    user_receiver_id,
    message,
  }: IComplimentRequest) {
    if (!message.trim()) throw new Error("Invalid message");

    if (user_sender_id === user_receiver_id)
      throw new Error("Cannot use same users");

    const userSenderExists = await prismaClient.user.findFirst({
      where: { id: user_sender_id },
    });

    if (!userSenderExists) throw new Error("User sender does not exists");

    const userReceiverExists = await prismaClient.user.findFirst({
      where: { id: user_receiver_id },
    });

    if (!userReceiverExists) throw new Error("User receiver does not exists");

    const tagExists = await prismaClient.tag.findFirst({
      where: { id: tag_id },
    });

    if (!tagExists) throw new Error("Tag do not exists");

    const compliment = await prismaClient.compliment.create({
      data: {
        tag_id,
        user_sender_id,
        user_receiver_id,
        message,
      },
    });

    return compliment;
  }
}

export { CreateComplimentService };
