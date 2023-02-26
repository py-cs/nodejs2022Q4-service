import { scrypt, timingSafeEqual } from 'crypto';
import { CRYPT_COST, CRYPT_SALT, KEY_LEN } from '../../common/constants';

export async function scryptHash(password: string) {
  return new Promise<string>((resolve) =>
    scrypt(password, CRYPT_SALT, KEY_LEN, { cost: 2 ** CRYPT_COST }, (_, key) =>
      resolve(key.toString('base64')),
    ),
  );
}

export async function scryptCompare(password: string, hashed: string) {
  const hashedPassword = await scryptHash(password);
  return timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(hashed));
}
