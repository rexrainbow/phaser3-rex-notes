import Managers from '../../runcommands/managers/Managers.js';
import Methods from './methods/Methods.js';

class CommandExecutor {
    constructor(scene, config) {
        this.sys = new Managers(scene, config);
    }

    destroy(fromScene) {
        this.sys.destroy(fromScene);
    }
}

Object.assign(
    CommandExecutor.prototype,
    Methods,
)

export default CommandExecutor;