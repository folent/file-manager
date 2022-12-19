import { EOL } from 'os';

const errorMessage = 'Operation failed';
const { stdout } = process;

export const loggingOperationError = () => {
    stdout.write(`${errorMessage}${EOL}`)
}
