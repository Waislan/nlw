import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender_id: string;
  user_receiver_id: string,
  message: string;
}

class CreateComplimentService {

  async execute ( { tag_id, user_sender_id, user_receiver_id, message } : IComplimentRequest ){
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    const userReceiverExists = await usersRepositories.findOne(user_receiver_id);

    if (user_sender_id === user_receiver_id) {
      throw new Error("=== Invalid user receiver or sender! ===");
    }

    if(!userReceiverExists){
      throw new Error("=== User receiver does not exists! ===");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver_id,
      user_sender_id,
      message
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };