import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Invalid user");
  }
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid user");
  }
};

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.roles)) {
      throw new UnauthorizedError("Unauthorised to access this route");
    }
    next();
  };
};
