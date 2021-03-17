import LogicBoard from './LogicBoard.js';
import SetInteractive from './input/SetInteractive.js';
import CreateTileTexture from './texture/CreateTileTexture.js';

var methods = {
    setInteractive: SetInteractive,
    createTileTexture: CreateTileTexture,
}
Object.assign(
    LogicBoard.prototype,
    methods
);

export default LogicBoard;