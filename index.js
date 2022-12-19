import path from 'node:path'
import { EOL, getInfoByParametr, homedir } from './modules/os.js';
import {add, cat, copyFile, renameFile, rm} from './modules/fs.js';
import {cd, ls, up} from './modules/nwd.js'
import { getHash } from './modules/hash.js';
import { compress, decompress } from './modules/zip.js';

let currentDir = homedir()
const parseArgs = () => {
    const { stdin, stdout, exit } = process;
    const args = process.argv.slice(2);

    const userNameArg = args.find(el => el.includes('--username'));
    const [_, userName] = userNameArg.split('=');
    if(!userNameArg || !userName) {
        throw new Error('Invalid input')
    }
    stdout.write(`Welcome to the File Manager, ${userName}!${EOL}`)


    const echoInput = async (chunk) => {
        const chunkStringified = chunk.toString();
        const [command, param1, param2] = chunkStringified.trim().split(' ');

        try {
            switch(command.trim()) {
                case '.exit':
                    process.emit('SIGINT');
                    break;
                case 'add':
                    await add(path.resolve(currentDir, param1));
                    break;
                case 'rm':
                    await rm(path.resolve(currentDir, param1));
                    break;
                case 'cat':
                    await cat(path.resolve(currentDir, param1))
                    break;
                case 'rn':
                    await renameFile(
                        path.resolve(currentDir, param1),
                        param2
                    )
                    break;
                case 'cp':
                    await copyFile(
                        path.resolve(currentDir, param1),
                        path.resolve(currentDir, param2)
                    )
                    break;
                case 'mv':
                    await copyFile(
                        path.resolve(currentDir, param1),
                        path.resolve(currentDir, param2)
                    )
                    await rm(path.resolve(currentDir, param1))
                    break;
                case 'up':
                    currentDir = up(currentDir);
                    break;
                case 'cd':
                    currentDir = await cd(currentDir, param1)
                    break;
                case 'ls':
                    await ls(currentDir)
                    break;
                case 'os':
                    await getInfoByParametr(param1)
                    break;
                case 'hash':
                    await getHash(path.resolve(currentDir, param1));
                    break;
                case 'compress':
                    await compress(
                        path.resolve(currentDir, param1),
                        path.resolve(currentDir, param2)
                    );
                    break;
                case 'decompress':
                    await decompress(
                        path.resolve(currentDir, param1),
                        path.resolve(currentDir, param2)
                    );
                    break;
                default:
                    throw new Error('Invalid input')
            }
        } catch (e) {
            stdout.write(`${e.message}${EOL}`)
        }
        stdout.write(`You are currently in ${currentDir}${EOL}`)
    };

    stdin.on('data', echoInput);
    process.on('SIGINT', () => {
        stdout.write(`Thank you for using File Manager, ${userName}, goodbye!${EOL}`)
        exit(0)
    })

};

parseArgs();
