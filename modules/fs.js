import { unlink, writeFile } from 'node:fs/promises';

const errorMessage = 'Operation failed';
const { stdout } = process;

export const add = async (filePath) => {
  try {
      await writeFile(filePath, '');
  
    } catch (err) {
      stdout.write(`${errorMessage}\n`)
  }
}

export const rm = async (filePath) => {
  try {
    await unlink(filePath);

  } catch (err) {
    stdout.write(`${errorMessage}\n`)
  }
}
