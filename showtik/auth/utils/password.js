import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export class Password {
  static async hash(password) {
    const salt = randomBytes(8).toString("hex");

    const buffer = await scrypt(password, salt, 64);
    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buffer = await scrypt(suppliedPassword, salt, 64);

    return buffer.toString("hex") === hashedPassword;
  }
}
