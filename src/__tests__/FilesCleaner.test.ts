import { FilesCleaner } from '../classes/FilesCleaner';
import { TestFileGenerator } from 'test-file-generator';

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

// it('Generated duplicated files', () => {
//   let cleaner = new FilesCleaner();
//   let generator = new TestFileGenerator();

// });
