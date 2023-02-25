import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { stat, access, mkdir, readdir } from 'fs/promises';
import { EOL } from 'os';
import { PassThrough } from 'stream';
import {
  ACTIVE_LOG_LEVELS,
  LOG_DIRECTORY,
  LOG_LIMIT,
} from './logger.constants';
import { LogLevels } from './logger.types';

export class FileWritter {
  private fileSplitter = new PassThrough();
  private logFilesNumber = 0;

  constructor(private directory: string) {
    this.init();
  }

  write(level: LogLevels, message: any) {
    if (!ACTIVE_LOG_LEVELS.includes(level)) return;

    const messageWithPrefix = `[${new Date().toLocaleString()}] [${level.toUpperCase()}] ${message.toString()}`;
    this.fileSplitter.write(messageWithPrefix + EOL);

    if (this.directory === LOG_DIRECTORY) {
      console[level](messageWithPrefix);
    }
  }

  private async init() {
    const outputPath = await this.getCurrentFile();
    let currentFileSize = 0;
    const outputStream = createWriteStream(outputPath, { flags: 'a+' });

    try {
      const currentLogStats = await stat(outputPath);
      currentFileSize = currentLogStats.size;
    } catch {}

    this.fileSplitter.pipe(outputStream);

    this.fileSplitter.on('data', (message: string) => {
      if (currentFileSize + message.length * 2 > LOG_LIMIT) {
        this.rotate();
        currentFileSize = 0;
      } else {
        currentFileSize += message.length;
      }
    });
  }

  private rotate() {
    this.fileSplitter.unpipe();

    const outputPath = this.getLogFilePath(this.nextFilename);
    const outputStream = createWriteStream(outputPath);

    this.fileSplitter.pipe(outputStream);
  }

  private get nextFilename(): string {
    const now = new Date();
    return `${now
      .toLocaleString('en-GB', { timeZone: 'UTC' })
      .replace(/[\/\:]/g, '.')}_${this.logFilesNumber++}.log`;
  }

  private getLogFilePath(filename: string) {
    return resolve(this.directory, filename);
  }

  private async getCurrentFile(): Promise<string> {
    try {
      await access(this.directory);
    } catch {
      await mkdir(this.directory);
    }

    const files = await readdir(this.directory, { withFileTypes: true });

    const filenames = files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    this.logFilesNumber = filenames.length;
    const currentFilename = filenames[this.logFilesNumber - 1];

    return this.getLogFilePath(currentFilename || this.nextFilename);
  }
}
