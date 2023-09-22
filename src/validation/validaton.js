import ResponseError from "../error/response-error.js";

const validate = (schema, request) => {
  const result = schema.validate(request, { abortEarly: false });
  if (result.error) {
    const errorMessage = result.error.details.map(({ message }) => message);
    throw new ResponseError(400, errorMessage);
  } else {
    return result.value;
  }
};

export default validate;
