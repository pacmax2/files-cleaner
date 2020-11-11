import { FilesCleaner } from '../classes/FilesCleaner';

it('Traverses the given path ', () => {
  let cleaner = new FilesCleaner();
  expect(cleaner.read()).toBe(true);
});