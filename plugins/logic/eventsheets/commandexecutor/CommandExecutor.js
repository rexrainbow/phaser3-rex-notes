import Managers from '../../runcommands/managers/Managers.js';
import BBCodeLog from '../../../utils/console/bbcodelog/BBCodeLog.js';
import Methods from './methods/Methods.js';

class CommandExecutor {
    constructor(scene, config = {}) {
        this.sys = new Managers(scene, config);

        var { delimiters = '[]', enable = true } = config.log || {};
        this.sys.logger = new BBCodeLog({ delimiters, enable });
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