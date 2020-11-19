import fs from 'fs';
import { join } from 'path';
import File from './File';
import crypto from 'crypto';
import PromiseQueue from './PromiseQueue';

export class FilesCleaner {
  private dir: string;
  private files: File[] = [];

  constructor(dir?: string) {
    this.dir = dir !== undefined ? dir : './';
  }

  /**
   * Traverses the directory reading all files, simple sync BFS in node.js
   */
  public read(): void {
    const queue = [this.dir];

    while (queue.length > 0) {
      const next = queue.shift();

      try {
        const fileStat = fs.statSync(next);

        if (fileStat.isFile()) {
          this.files.push(new File(next, fileStat.size, fileStat.ctimeMs, fileStat.mtimeMs, fileStat.atimeMs));
          continue;
        } else if (fileStat.isDirectory()) {
          const files = fs.readdirSync(next);
          queue.push(...files.map((f) => join(next, f)));
        }
      } catch (err) {
        throw new Error(err);
      }
    }

    this.processHash(this.files);
  }

  private processHash(files: File[]): void {
    try {
      const tasks: any[] = [];

      const hashTask = (file: File) =>
        new Promise((resolve, reject) => {
          const hash = crypto.createHash('sha1');
          const stream = fs.createReadStream(file.getDir());
          stream.on('error', (err) => reject(err));
          stream.on('data', (chunk) => hash.update(chunk));
          stream.on('end', () => resolve(hash.digest('hex')));
        });

      for (let i = 0; i < files.length; i++) {
        tasks.push(hashTask(files[i]));
      }
      const taskQueue = new PromiseQueue(tasks, 2);
      taskQueue.run();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Calculates the nodejs Hash and phash for the traversed files, the pHash is only calculated for images.
   */
  public getDir(): string {
    return this.dir;
  }

  public getFiles(): File[] {
    return this.files;
  }

  public setDir(value: string) {
    this.dir = value;
  }
}
