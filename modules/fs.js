import { unlink, writeFile, rename } from 'node:fs/promises';
import fs from 'node:fs';
import { EOL } from 'node:os';
import path from 'node:path';
import {loggingOperationError} from "../helpers/loggingOperationError.js";

const { stdout } = process;

const add = async (filePath) => {
  try {
      await writeFile(filePath, '');

    } catch (err) {
      loggingOperationError()
  }
}

const rm = async (filePath) => {
  try {
    await unlink(filePath);

  } catch (err) {
    loggingOperationError()
  }
}

const cat = async (filePath) => {
  try {
    const readStream = fs.createReadStream(filePath);
    readStream.on('data', function (chunk) {
      let convertedChunk = chunk.toString();
      stdout.write(`${convertedChunk}${EOL}`)
    });
  } catch (err) {
    loggingOperationError()
  }
}

const renameFile = async (file, newFile) => {
  try {
    const newFilePath = path.resolve(path.dirname(file), newFile);

    await rename(file, newFilePath);
  } catch (e) {
    loggingOperationError()
  }
}


const copyFile = async (file, newPath) => {
  try {
    const fileName = path.basename(file);

    fs.createReadStream(file).pipe(fs.createWriteStream(path.resolve(newPath, fileName)));
  } catch (e) {
    loggingOperationError()
  }
}

export {
  add,
  rm,
  cat,
  renameFile,
  copyFile
}
