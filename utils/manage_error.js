import { MongooseError } from "mongoose";

export const manageAsync = (func) => async (preState, formData) =>
  Promise.resolve(func(preState, formData)).catch(handleError);

export const handleError = (error) => {
  let errors =
    error?.errors || error?.message || error || "Internal Error Server";
  let defaultValue = error.defaultValue ?? undefined;

  if (defaultValue) {
    return { success: false, errors, defaultValue };
  }

  return { success: false, errors };
};
