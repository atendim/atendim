import bcrypt from 'bcryptjs';

async function buildHashedPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const HashUtils = {
  buildHashedPassword
};
