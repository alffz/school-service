import userService from "../service/user-service.js";

const login = async (req, res, next) => {
  try {
    const { token, refreshToken, role } = await userService.login(req.body);

    res
      .status(200)
      .cookie("token", token)
      .cookie("refreshToken", refreshToken)
      .json({ message: "SUCCESS", role: role })
      .end();
  } catch (err) {
    next(err);
  }
};
const refreshToken = async (req, res, next) => {
  try {
    const { token, newRefreshToken, role } = await userService.refreshToken(
      req.cookies.refreshToken
    );
    // console.log(token, newRefreshToken);
    res
      .status(200)
      .cookie("token", token)
      .cookie("refreshToken", newRefreshToken)
      .json({ message: "SUCCESS", role: role })
      .end();
  } catch (err) {
    next(err);
  }
};
const create = async (req, res, next) => {
  try {
    await userService.create(req.body);
    res.status(200).json({ message: "SUCCESS" }).end();
  } catch (err) {
    next(err);
  }
};

export default { login, refreshToken, create };
