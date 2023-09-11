import { customAlphabet } from "nanoid";

function generateCircleCode() {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, 6);
  const sixDigitCode = nanoid();
  return sixDigitCode;
}

export default generateCircleCode;
