import jwt from "jsonwebtoken";
import { UserToken } from "models";

class JwtTokenHelper {
  parseToken(token: string): any {
    const decoded = jwt.decode(token, {
      complete: true
    });
    if (decoded === null || typeof decoded === "string") {
      return;
    }
    const userId = decoded["UserId"];
    const email = decoded["Email"];
    const firstName = decoded["FirstName"];
    const lastName = decoded["LastName"];
    const userName = decoded["UserName"];
    return new UserToken(userId, email, firstName, lastName, userName);
  }
}

export const jwtTokenHelper = new JwtTokenHelper();
