import fs from 'fs';
import { join } from 'path';
import File from './File';

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
  }

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
