import { FilesCleaner } from '../classes/FilesCleaner';

it('Reads all files in ./ ', () => {
  let cleaner = new FilesCleaner();
  cleaner.read();
  return expect(cleaner.getFiles().length).toBeGreaterThan(0);
});
