import { homedir, EOL, cpus, hostname, endianness } from 'node:os'

const { stdout } = process;
const errorMessage = 'FS operation failed';

const getInfoByParametr = async (param) => {
    try {
        switch(param.trim()) {
            case '--EOL':
                stdout.write(JSON.stringify(EOL) + EOL)
                break;
            case '--cpus':
                stdout.write(getCpusInfo())
                break;
            case '--homedir':
                stdout.write(homedir() + EOL)
                break;
            case '--username':
                stdout.write(hostname() + EOL)
                break;
            case '--architecture':
                stdout.write(endianness() + EOL)
                break;
            default:
                throw new Error(errorMessage)
        }
    
      } catch (err) {
        stdout.write(`${errorMessage}\n`)
    }
}

const getCpusInfo = () => {
    const cpu = cpus();
    let amountOfCPUS = `Overall amount of CPUS: ${cpu.length}${EOL}`;
    return amountOfCPUS + cpu.map(({model, speed}) => {
        return `model: ${model}${EOL}` +  `speed: ${speed} GHz${EOL}`;
    }).join(' ')
}



export {
    homedir,
    EOL,
    getInfoByParametr
}