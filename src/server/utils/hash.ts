import bcrypt from 'bcryptjs';

async function buildHashedPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function compareHashedPassword(
  password: string,
  hashedPassword?: string
) {
  if (!hashedPassword) return false;
  return await bcrypt.compare(password, hashedPassword);
}

export const HashUtils = {
  buildHashedPassword,
  compareHashedPassword
};
