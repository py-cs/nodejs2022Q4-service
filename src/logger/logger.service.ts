import { Injectable, LoggerService } from '@nestjs/common';
import { resolve } from 'path';
import { FileWritter } from './fileWriter';
import { LOG_DIRECTORY } from './logger.constants';
import { LogLevels } from './logger.types';

@Injectable()
export class AppLogger implements LoggerService {
  private commonWriter = new FileWritter(LOG_DIRECTORY);
  private errorWriter = new FileWritter(resolve(LOG_DIRECTORY, 'errors'));

  log(message: any) {
    this.commonWriter.write(LogLevels.LOG, message);
  }

  error(message: any) {
    this.commonWriter.write(LogLevels.ERROR, message);
    this.errorWriter.write(LogLevels.ERROR, message);
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
