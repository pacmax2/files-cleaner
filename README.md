# Test file generator

This is a simple module to generate many different random files, which could be used for testing other algorithms that work with files. 

Currently supported formats (**jpeg**, **gif**, **cvs** and **txt**).

|  Image  | Gif | 
| --------- | --------- | 
![alt text](https://github.com/pacmax2/test-file-generator/blob/main/exampleOutput/dsfuiak7qg9.png?raw=true) | ![alt text](https://github.com/pacmax2/test-file-generator/blob/main/exampleOutput/9v4qvs9619i.gif?raw=true)

For other examples on random cvs / txt check the exampleOutput folder.

##  How to use:

* Install ```npm install test-file-generator``` or ```yarn install test-file-generator```
* Include in your project 
  
```typescript
import { TestFileGenerator } from 'test-file-generator';
let generator = new TestFileGenerator('txt');
generator.generateFile();
```

1. To generate one txt file and random name, at the default path "**./**". 
```typescript
  let generator = new TestFileGenerator('txt');
  generator.generateFile();
```
  2. This will generate a gif file with the specified parameters.
```typescript
  let generator = new TestFileGenerator('gif');
  generator.setLocation('my_path/');
  generator.setImageSize(100, 100);
  generator.setName('my_file_name');
  generator.generateFile();
```
  3. This will generate a cvs file of 3000 KB.
```typescript
  let generator = new TestFileGenerator('csv');
  generator.setLocation('output/');
  generator.setSize(3000);
  generator.setName('my_file_name');
  generator.generateFile();
```

## API: 
|  #  | Method | Input / Type | Output / Type | Description
|-----|---------------- | --------------- | --------------- | --------------- |
1 |  new TestFileGenerator(type: string, name?: string, location?: string, size?: number, clean?: boolean) | [**required**] type : string <br> [**optional**] name: string <br> [**optional**] location: string <br> [**optional**] size: number <br> [**optional**] clean: boolean  | **TestFileGenerator** object | The constructor of the object. The default values for the optional parameters are: (name = **'random'**, location = '**'./'**', size = **20**, clean = **false**), and even though not passed in the constructor for the images is **(100, 100)**.|
2 |  generateFile() | None | **boolean** (true if created, false otherwise) | This method generates the file with the specified parameters. |
3 |  setLocation(location: string)  | **string** | None | This method sets the location on which the file is going to be written. |
4 |  setName(location: string)  | **string** | None | This method sets the name of the file. If not specified the file will have a random name which you can get with getName(). |
5 |  setType(type: string)  | **string** | None | This method sets the file type, currently supported (**jpeg**, **gif**, **cvs** and **txt**), lowercased. |
6 |  setSize(size: number)  | **number** | None | This method sets the size that the file should have, currently only works for **txt** and **cvs** file types. |
6 |  setImageSize((x: **number**, y: **number**)  | **number**, **number** | None | This method sets the size of the **jpeg** or **gif** to be generated. |
7 |  setClean(location: string)  | **string** | None | This method deletes the created file after creation (just for writing unit tests). |
8 |  getLocation()  | None | **string** | This method gets the file path. |
9 |  getName()  | None | **string** | This method gets the file name. |
10 |  getSize()  | None | **string** | This method gets the file generation setted size (only for cvs/txt). |
11 |  getFileType()  | None | **string** | This method gets the file type. |

# License
**MIT**

# Issues, errors, requests or contributions
[**Open an issue here**](https://github.com/pacmax2/file-generator/issues)
