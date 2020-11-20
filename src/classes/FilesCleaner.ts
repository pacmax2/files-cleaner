import fs from 'fs';
import { join } from 'path';
import File from './File';
import crypto from 'crypto';

export class FilesCleaner {
  private dir: string;
  private files: File[] = [];
  private unprocessed: File[] = [];

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
          const file : File = new File(next, fileStat.size, fileStat.ctimeMs, fileStat.mtimeMs, fileStat.atimeMs);
          this.files.push(file);
          continue;
        } else if (fileStat.isDirectory()) {
          const files = fs.readdirSync(next);
          queue.push(...files.map((f) => join(next, f)));
        }
      } catch (err) {
        throw new Error(err);
      }
    }

    // Sorting by file size
    this.files.sort((a, b): any => {
      return b.getSize() - a.getSize();
    });
  }

  // Will be used only for files greater than 500-1gb.
  private getShaStream(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha1');
      const stream = fs.createReadStream(file.getDir());

      stream.on('error', (err) => reject(err));
      stream.on('data', (chunk) => hash.update(chunk));
      stream.on('end', () => resolve(hash.digest('hex')));
    });
  }

  private getShaSync(file: File): string {
    if(file.getSize() === 0){
      return 'none';
    }

    const hash = crypto.createHash('sha1');
    const data = fs.readFileSync(file.getDir());
    hash.update(data);
    return hash.digest('hex');
  }

  public  processHash(): void {
    for(const f of this.files){
      f.setHash(this.getShaSync(f));
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
