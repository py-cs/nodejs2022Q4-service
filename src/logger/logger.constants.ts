import { LogLevels } from './logger.types';

export const LOG_DIRECTORY = process.env.LOG_DIRECTORY;

export const HIDE_CREDENTIALS = process.env.HIDE_CREDENTIALS === 'true';

export const LOG_LIMIT =
  (Math.max(Number(process.env.LOG_LIMIT), 1) || 1) * 2 ** 10;

export const LOG_LEVEL = Number(process.env.LOG_LEVEL);

export const ACTIVE_LOG_LEVELS: LogLevels[] = [
  LogLevels.DEBUG,
  LogLevels.VERBOSE,
  LogLevels.LOG,
  LogLevels.WARN,
  LogLevels.ERROR,
].slice(LOG_LEVEL);
