import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress, constants } from 'node:zlib';
import { pipeline } from 'node:stream';
import {loggingOperationError} from "../helpers/loggingOperationError.js";

const compress = async (filePath, archivePath) => {

    try {
        const input = createReadStream(filePath, 'utf-8');
        const output = createWriteStream(archivePath);

        const gzip = createBrotliCompress({
            params: {
                [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
            }
        });

        pipeline(
            input,
            gzip,
            output,
            err => {
                if (err) {
                    loggingOperationError()
                }
            }
        );
    } catch (e) {
        loggingOperationError()
    }
};

const decompress = async (archivePath, filePath) => {
    try {
        const input = createReadStream(archivePath);
        const output = createWriteStream(filePath, 'utf-8');
        const unZip = createBrotliDecompress({
            params: {
                [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
            }
        });

        pipeline(
            input,
            unZip,
            output,
            err => {
                if (err) {
                    console.log(err)
                    loggingOperationError()
                }
            }
        );
    } catch (e) {
        loggingOperationError()
    }
};

export {
    compress,
    decompress
}
