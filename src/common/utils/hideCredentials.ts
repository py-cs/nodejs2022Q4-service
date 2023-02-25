import { HIDE_CREDENTIALS } from '../../logger/logger.constants';

const PRIVATE_FIELDS = ['password', 'accessToken', 'refreshToken'];
const MASK = '******';

export function hideCredentials(
  data: Record<string, any> | Array<Record<string, any>>,
) {
  if (!HIDE_CREDENTIALS) return data;

  if (Array.isArray(data)) return data.map((record) => hideCredentials(record));

  const safeData = { ...data };
  PRIVATE_FIELDS.forEach((field) => {
    if (data.hasOwnProperty(field)) {
      safeData[field] = MASK;
    }
  });
  return safeData;
}
