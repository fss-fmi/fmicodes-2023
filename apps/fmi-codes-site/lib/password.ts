import sha256 from 'crypto-js/sha256';

export async function hashPassword(password: string): Promise<string> {
  return await sha256(password).toString();
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return (await hashPassword(password)) === hashedPassword;
}
