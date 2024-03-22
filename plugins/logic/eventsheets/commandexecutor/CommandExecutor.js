import Managers from '../../runcommands/managers/Managers.js';
import BBCodeLog from '../../../utils/console/bbcodelog/BBCodeLog.js';
import Methods from './methods/Methods.js';

class CommandExecutor {
    constructor(scene, config = {}) {
        this.sys = new Managers(scene, config);

        var { log = {} } = config;
        this.sys.logger = new BBCodeLog(log);
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