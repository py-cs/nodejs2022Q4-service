import { LogLevels } from './logger.types';

export const LOG_DIRECTORY = process.env.LOG_DIRECTORY;

export const HIDE_CREDENTIALS = Boolean(process.env.HIDE_CREDENTIALS);

export const LOG_LIMIT =
  (Math.max(Number(process.env.LOG_LIMIT), 1) || 1) * 2 ** 10;

export const LOG_LEVEL = Number(process.env.LOG_LEVEL) || 3;

export const ACTIVE_LOG_LEVELS: LogLevels[] = [
  LogLevels.ERROR,
  LogLevels.WARN,
  LogLevels.LOG,
  LogLevels.DEBUG,
  LogLevels.VERBOSE,
].slice(0, LOG_LEVEL);
