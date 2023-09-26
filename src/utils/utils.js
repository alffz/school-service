import ResponseError from "../error/response-error.js";

export const filterRequestData = (request, allowedFields) => {
  const keys = Object.keys(request);
  const notAllowed = keys.filter((field) => !allowedFields.includes(field));

  if (notAllowed.length > 0) {
    throw new ResponseError(400, [
      `kolom ${notAllowed.join(", ")} tidak diijinkan`,
    ]);
  }

  return request;
};
