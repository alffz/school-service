export const restrictAccessToOwnData = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      return next();
    }

    const idParam = parseInt(req.params.id);
    const idUser = parseInt(req.user.id);

    if (idParam === idUser) {
      next();
    } else {
      res.status(403).json({ message: "Access Forbidden" }).end();
    }
  };
};
