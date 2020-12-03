export default class File {
  private name: string;
  private dir: string;
  private size: number;
  private type: string;
  private phash: string; // only for image files
  private hash: string; // nodejs hash
  private cDate: number;
  private aDate: number;
  private mDate: number;

  constructor(dir: string, size: number, cDate: number, mDate: number, aDate: number) {
    this.dir = dir;
    this.size = size;
    this.cDate = cDate;
    this.mDate = mDate;
    this.aDate = aDate;
    this.mDate = mDate;
  }

  public getName(): string {
    const splited: string[] = this.dir.split('/');
    this.name = splited[splited.length - 1];
    return this.name;
  }

  public getDir(): string {
    return this.dir;
  }

  public getSize(): number {
    return this.size;
  }

  public getType(): string {
    return this.type;
  }

  public getPhash(): string {
    return this.phash;
  }

  public getHash(): string {
    return this.hash;
  }

  public getCDate(): number {
    return this.cDate;
  }

  public getADate(): number {
    return this.aDate;
  }

  public getMDate(): number {
    return this.mDate;
  }

  public setName(value: string) {
    this.name = value;
  }

  public setDir(value: string) {
    this.dir = value;
  }

  public setSize(value: number) {
    this.size = value;
  }

  public setType(value: string) {
    this.type = value;
  }

  public setPhash(value: string) {
    this.phash = value;
  }

  public setHash(value: string) {
    this.hash = value;
  }

  public setCDate(value: number) {
    this.cDate = value;
  }

  public setMDate(value: number) {
    this.mDate = value;
  }

  public setADate(value: number) {
    this.aDate = value;
  }
}
