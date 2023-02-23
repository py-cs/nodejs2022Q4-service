import { Injectable, LoggerService } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { access, mkdir, readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import { PassThrough } from 'stream';

const LOGS_DIR = 'c:/loggs';
const SIZE_LIMIT = 300;

@Injectable()
export class Logger implements LoggerService {
  private fileSplitter = new PassThrough();
  private logFilesNumber = 0;

  constructor() {
    this.init();
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
      if (currentFileSize + message.length * 2 > SIZE_LIMIT) {
        this.rotate();
        currentFileSize = 0;
      } else {
        currentFileSize += message.length;
      }
    });
  }

  private rotate() {
    this.fileSplitter.unpipe();

    const outputPath = this.getLogFilePath(this.newFilename);
    const outputStream = createWriteStream(outputPath);
    this.fileSplitter.pipe(outputStream);
  }

  log(message: any) {
    console.log(message);
    this.fileSplitter.write(message.toString() + '\n');
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message);
  }

  // /**
  //  * Write a 'debug' level log.
  //  */
  // debug?(message: any, ...optionalParams: any[]) {}

  // /**
  //  * Write a 'verbose' level log.
  //  */
  // verbose?(message: any, ...optionalParams: any[]) {}

  private get newFilename(): string {
    const now = new Date();
    return `${now.toLocaleDateString()}_${this.logFilesNumber++}.log`;
  }

  private getLogFilePath(filename: string) {
    return resolve(LOGS_DIR, filename);
  }

  private async getCurrentFile(): Promise<string> {
    try {
      await access(LOGS_DIR);
      console.log('has access');
    } catch {
      console.log('no access');
      await mkdir(LOGS_DIR);
      console.log('created');
    }
    console.log('reading');
    const files = await readdir(LOGS_DIR);
    this.logFilesNumber = files.length;

    const lastFilename = files[this.logFilesNumber - 1];

    console.log(lastFilename, this.logFilesNumber);

    return this.getLogFilePath(lastFilename ?? this.newFilename);
  }
}
