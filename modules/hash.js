import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { EOL } from 'os'

const errorMessage = 'FS operation failed';
const { stdout } = process;
const hash = createHash('sha256');

export const getHash = async (path) => {
    try {
        const data = await readFile(path, { encoding: 'utf8' });
        if (data) {
            hash.update(data);
            stdout.write(`hex is ${hash.digest('hex')}` + EOL);
        } else {
            stdout.write(`${errorMessage}\n`)
        }
    } catch (e) {
        stdout.write(`${errorMessage}\n`)
    }
}