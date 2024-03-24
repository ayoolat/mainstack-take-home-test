import { Request } from "express";
import Joi from "joi";

export default (
  schema: Joi.ObjectSchema<any>,
  payload: Record<string, any>
): boolean => {
  // validate the payload
  const validated = schema.validate(payload);
  if (validated.error) {
    throw Error(validated.error.details[0].message.replace(/"/g, ""));
  }
  return true;
};
