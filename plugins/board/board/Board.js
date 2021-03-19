import LogicBoard from './LogicBoard.js';
import SetInteractive from './input/SetInteractive.js';

var methods = {
    setInteractive: SetInteractive
}
Object.assign(
    LogicBoard.prototype,
    methods
);

export default LogicBoard;