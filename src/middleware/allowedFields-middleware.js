export const allowedFields = (object) => {
  return (req, res, next) => {
    req.fields = object;
    next();
  };
};
