import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress, constants } from 'node:zlib';
import { pipeline } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

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
                    console.error(err);
                }
            }
        );
    } catch (e) {
        console.error(e);
    }
};

const decompress = async (filePath, archivePath) => {
    try {
        console.log(filePath, archivePath);
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
                    console.error(err);
                }
            }
        );
    } catch (e) {
        console.error(e);
    }
};

export {
    compress,
    decompress
}