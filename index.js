import path from 'node:path'
import { EOL, getInfoByParametr, homedir } from './modules/os.js';
import { add, rm } from './modules/fs.js';
import { ls, up } from './modules/nwd.js'
import { getHash } from './modules/hash.js';
import { compress, decompress } from './modules/zip.js';

let currentDir = homedir()
const parseArgs = () => {
    const { stdin, stdout, exit } = process;
    const args = process.argv.slice(2);

    const userNameArg = args.find(el => el.includes('--username'));
    const [_, userName] = userNameArg.split('=');
    stdout.write(`Welcome to the File Manager, ${userName}!${EOL}`)
 

    const echoInput = (chunk) => {
        const chunkStringified = chunk.toString();
        const [command, param1, param2] = chunkStringified.split(' ');

        try {
            switch(command.trim()) {
                case '.exit':
                    process.emit('SIGINT');
                    break;
                case 'add':
                    add(currentDir + '/' + param1.trim());
                    break;
                case 'rm':
                    const filePath = path.resolve(currentDir, param1);
                    rm(filePath);
                    break;
                case 'up':
                    const currentPath = up(currentDir);
                    console.log(currentPath);
                    break;
                case 'ls':
                    ls(currentDir)
                    break;
                case 'os':
                    getInfoByParametr(param1)
                    break;
                case 'hash':
                    getHash(currentDir + '/' + param1.trim());
                    break;
                case 'compress':
                    const path1 = path.resolve(currentDir, param1.trim());
                    const path2 = path.resolve(currentDir, param2.trim());
                    compress(path1, path2);
                    break;
                case 'decompress':
                    const path3 = path.resolve(currentDir, param1.trim());
                    const path4 = path.resolve(currentDir, param2.trim());
                    decompress(path4, path3);
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