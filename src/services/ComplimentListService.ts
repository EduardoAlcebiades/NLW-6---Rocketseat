import { prismaClient } from "../prisma";

class ComplimentListService {
  async receivedByUser(user_id: string) {
    const compliments = await prismaClient.compliment.findMany({
      where: {
        user_receiver_id: user_id,
      },
      include: {
        userSender: true,
      },
    });

    return compliments;
  }

  async sendedByUser(user_id: string) {
    const compliments = await prismaClient.compliment.findMany({
      where: {
        user_sender_id: user_id,
      },
      include: {
        userReceiver: true,
      },
    });

    return compliments;
  }
}

export { ComplimentListService };
