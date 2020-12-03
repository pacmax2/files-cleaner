import fs from 'fs';
import { join } from 'path';
import File from './File';
import crypto from 'crypto';

export class FilesCleaner {
  private ignoredFolders: Set<string>; // Ignore list, files and folders set for quick access
  private ignoredFolderList: string[] = ['node_modules', '.git'];
  private ignoredFiles: Set<string>; // Ignore list, files and folders set for quick access
  private ignoredFileList: string[] = [
    '.DS_Store',
    '.gitignore',
    '.npmignore',
    '.prettierrc',
    'LICENSE',
    'yarn.lock',
    'yarn-error.log',
    'package-lock.json',
    'package.json',
    'jest.config.json',
    '.prettierrc',
    'tslint.json',
  ];

  private dir: string;
  private files: File[] = [];
  private map: Map<string, File[]>;

  constructor(dir?: string) {
    this.dir = dir !== undefined ? dir : './';
    this.map = new Map<string, File[]>();
    this.ignoredFiles = new Set<string>();
    this.ignoredFolders = new Set<string>();

    for (const s of this.ignoredFileList) {
      this.ignoredFiles.add(s);
    }

    for (const s of this.ignoredFolderList) {
      this.ignoredFolders.add(s);
    }
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
          const file: File = new File(next, fileStat.size, fileStat.ctimeMs, fileStat.mtimeMs, fileStat.atimeMs);

          if (!this.ignoredFiles.has(file.getName())) {
            this.files.push(file);
          } else {
            // Ignored files else for verbose
          }

          continue;
        } else if (fileStat.isDirectory()) {
          if (!this.ignoredFolders.has(next)) {
            const files = fs.readdirSync(next);
            queue.push(...files.map((f) => join(next, f)));
          } else {
            // Ignored folders else for verbose
          }
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
    if (file.getSize() === 0) {
      return 'none';
    }

    const hash = crypto.createHash('sha1');
    const data = fs.readFileSync(file.getDir());
    hash.update(data);
    return hash.digest('hex');
  }

  public processHash(): void {
    for (const f of this.files) {
      f.setHash(this.getShaSync(f));
      if (this.map.has(f.getHash())) {
        const dupArray: File[] = this.map.get(f.getHash());
        dupArray.push(f);
      } else {
        const newArray: File[] = [];
        newArray.push(f);
        this.map.set(f.getHash(), newArray);
      }
    }

    // Cleaning the Map to only keep the dups
    let dups: File[] = [];

    for (const key of this.map.keys()) {
      dups = this.map.get(key);

      // Files with only 1 occurence
      if (dups.length === 1) {
        this.map.delete(key);
      } else {
        // Any operation to be done with the dups
      }
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

  public getMapSize(): number {
    return this.map.size;
  }

  public setDir(value: string) {
    this.dir = value;
  }
}
