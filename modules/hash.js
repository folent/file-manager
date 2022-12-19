import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { EOL } from 'os';
import {loggingOperationError} from "../helpers/loggingOperationError.js";

const { stdout } = process;
const hash = createHash('sha256');

export const getHash = async (path) => {
    try {
        const data = await readFile(path, { encoding: 'utf8' });
        if (data) {
            hash.update(data);
            stdout.write(`hex is ${await hash.digest('hex')}` + EOL);
        } else {
            loggingOperationError()
        }
    } catch (e) {
        loggingOperationError()
    }
}
