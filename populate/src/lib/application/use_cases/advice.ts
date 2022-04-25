import { IAdvice, IAdvicePayload } from "lib/domain/advice";
import { IAdviceRepository } from "lib/domain/advice.repository";

export const get_advice = async (adviceRepository:IAdviceRepository): Promise<IAdvice[]> => {
  return await adviceRepository.get();
};

export const create_advice = async (advice:IAdvicePayload, adviceRepository:IAdviceRepository): Promise<void> => {
  await adviceRepository.persist(advice);
};