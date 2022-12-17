import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';

export const up = async (path) => {
    // const __filename = fileURLToPath(path);
    const __dirname = dirname(path);
    return basename(dirname(path));
}