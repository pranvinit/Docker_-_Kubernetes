import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export class Password {
  static async hash(password: string) {
    const salt = randomBytes(8).toString("hex");

    const buffer = (await scrypt(password, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buffer = (await scrypt(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString("hex") === hashedPassword;
  }
}
