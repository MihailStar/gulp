/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const DIRECTORY = path.join(__dirname, './src/blocks');

const [, , blockName] = process.argv;
const filesData = {
  js: '',
  pug: `mixin ${blockName}\n  .${blockName}&attributes(attributes)\n    block\n`,
  scss: `.${blockName} {\n  @include border-box;\n}\n`,
};

function createDirectory(directoryPath /*: string */) /*: Promise<string> */ {
  return new Promise((onSuccess, onError) => {
    fs.mkdir(directoryPath, (error /*: ?Error */) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(directoryPath);
      }
    });
  });
}

function createFile(
  filePath /*: string */,
  fileData /*: string */
) /*: Promise<string> */ {
  return new Promise((onSuccess, onError) => {
    fs.writeFile(filePath, fileData, 'utf8', (error /*: ?Error */) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(filePath);
      }
    });
  });
}

function createFiles(
  directoryPath /*: string */
) /*: Promise<Array<string>> */ {
  const promises = [];

  Object.entries(filesData).forEach(([extension, fileData]) => {
    promises.push(
      createFile(
        path.join(directoryPath, `${blockName}.${extension}`),
        String(fileData)
      )
    );
  });

  return Promise.all(promises);
}

Promise.resolve()
  .then(() => createDirectory(path.join(DIRECTORY, blockName)))
  .then((directoryPath /*: string */) => createFiles(directoryPath))
  .catch((error /*: Error */) => console.error(error));
