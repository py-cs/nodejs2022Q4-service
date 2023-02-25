import { Injectable, LoggerService } from '@nestjs/common';
import { resolve } from 'path';
import { FileWritter } from './fileWriter';
import { LOG_DIRECTORY } from './logger.constants';
import { LogLevels } from './logger.types';

@Injectable()
export class Logger implements LoggerService {
  private commonWriter = new FileWritter(LOG_DIRECTORY);
  private errorWriter = new FileWritter(resolve(LOG_DIRECTORY, 'errors'));

  log(message: any) {
    this.commonWriter.write(LogLevels.LOG, message);
  }

  error(err: any) {
    const errorMessage = `${err.status} ${err.response.error} ${JSON.stringify(
      err.response.message,
    )}`;
    this.commonWriter.write(LogLevels.ERROR, errorMessage);
    this.errorWriter.write(LogLevels.ERROR, errorMessage);
  }

  warn(message: any) {
    this.commonWriter.write(LogLevels.WARN, message);
  }

  debug(message: any) {
    this.commonWriter.write(LogLevels.DEBUG, message);
  }

  verbose(message: any) {
    this.commonWriter.write(LogLevels.VERBOSE, message);
  }
}
