import path from 'path';
import { access, readdir } from 'node:fs/promises';
import fs from 'node:fs';
import {loggingOperationError} from "../helpers/loggingOperationError.js";

const ROOT_PATH = 'C:\\'

const up = (currentPath) => {
    if (currentPath === ROOT_PATH) {
        return currentPath
    }
    return path.dirname(currentPath)
}

const cd = async (currentDir, nextFolder) => {
    const currentPath = path.resolve(currentDir, nextFolder);

    try {
        await access(currentPath, fs.constants.F_OK)

        return currentPath;
    } catch (e) {
        return currentDir;
    }
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
        loggingOperationError()
    }
}

export {
    up,
    cd,
    ls
}
