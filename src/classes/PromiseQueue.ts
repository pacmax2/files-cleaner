export default class PromiseQueue {
  private running: any[] = [];
  private complete: any[] = [];
  private todo: any[] = [];
  private count: number;

  constructor(tasks: any[] = [], concurrentCount: number = 1) {
    this.todo = tasks;
    this.running = [];
    this.complete = [];
    this.count = concurrentCount;
  }

  private runNext(): boolean {
    return this.running.length < this.count && this.todo.length > 0;
  }

  public run(): void {
    while (this.runNext()) {
      const promise = this.todo.shift();
      promise
        .then(() => {
          this.complete.push(this.running.shift());
          this.run();
        })
        .catch((err) => {
          throw new Error(err);
        });
      this.running.push(promise);
    }
  }
}
