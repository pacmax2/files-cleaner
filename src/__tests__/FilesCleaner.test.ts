import { FilesCleaner } from '../classes/FilesCleaner';

it('Reads all files in ./ ', () => {
  let cleaner = new FilesCleaner();
  cleaner.read();
  return expect(cleaner.getFiles().length).toBeGreaterThan(0);
});

it('Creates hashses of all files ', async () => {
  let cleaner = new FilesCleaner();
  cleaner.read();
  const data = await cleaner.processHash();
  return expect(data).toEqual(undefined);
});
