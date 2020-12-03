import { FilesCleaner } from '../classes/FilesCleaner';

it('Reads all files in ./ ', () => {
  let cleaner = new FilesCleaner();
  cleaner.read();
  return expect(cleaner.getFiles().length).toBeGreaterThan(0);
});

it('Creates hashses of all files ', () => {
  let cleaner = new FilesCleaner();
  cleaner.read();
  cleaner.processHash();
  return expect(cleaner.getMapSize()).toBeGreaterThanOrEqual(1);
});
