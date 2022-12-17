import { fileURLToPath } from 'url';
import { dirname, basename, resolve } from 'path';
import { readdir } from 'fs/promises';

const errorMessage = 'Operation failed';

const { stdout } = process;

const up = async (path) => {
    // const __filename = fileURLToPath(path);
    const __dirname = dirname(path);
    return basename(dirname(path));
}

const ls = async (path) => {
    try {
        const files = await readdir(path, { withFileTypes: true });

        const filesAsTable = files.map(file => {
            return {
                Name: file.name,
                Type: file.isDirectory() ? 'directory' : 'file'
            }
        })
        console.table(
            filesAsTable
                .sort((a, b) => a.Name.localeCompare(b.Name))
                .sort((a, b) => a.Type.localeCompare(b.Type)),
            ['Name', 'Type'])
    } catch (e) {
        stdout.write(`${errorMessage}\n`)
    }
}

export {
    up,
    ls
}