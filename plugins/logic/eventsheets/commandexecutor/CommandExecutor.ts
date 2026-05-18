import Managers from '../../runcommands/managers/Managers';
import BBCodeLog from '../../../utils/console/bbcodelog/BBCodeLog';
import Methods from './methods/Methods';

class CommandExecutor {
    sys: any;

    constructor(scene?: any, config = {}) {
        this.sys = new Managers(scene, config);

        var { log = {} } = config;
        this.sys.logger = new BBCodeLog(log);
    }

    destroy(fromScene?: any) {
        this.sys.destroy(fromScene);
    }
}

Object.assign(
    CommandExecutor.prototype,
    Methods,
)

export default CommandExecutor;