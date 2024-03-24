import Joi from "joi";
import { LoginDTO } from "types/auth/auth";

export const login = Joi.object<LoginDTO>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
