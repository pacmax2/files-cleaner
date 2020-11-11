export class FilesCleaner {
  private path: string;

  constructor(path?: string) {
    this.path = path !== undefined ? path : './';
  }

  /**
   * Traverses the path reading all files
   */
  read(): boolean {
    return true;
  }
}
