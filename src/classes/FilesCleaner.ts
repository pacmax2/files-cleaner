import fs from 'fs';
import { join } from 'path';

export class FilesCleaner {
  private dir: string;
  private files: string[] = [];

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
          this.files.push(next);
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

  public getFiles(): string[] {
    return this.files;
  }

  public setDir(value: string) {
    this.dir = value;
  }

  public setFiles(value: string[]) {
    this.files = value;
  }
}
