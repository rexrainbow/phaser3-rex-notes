'use strict'
import WaitTimeCmd from './WaitTimeCmd.js';
import WaitEventCmd from './WaitEventCmd.js';
import LabelCmd from './LabelCmd.js';
import ExitCmd from './ExitCmd.js';
import CustomCmd from './CustomCmd.js';

class CommandsManager {
    constructor(scenario) {
        this.waitTimeCmd = new WaitTimeCmd(scenario);
        this.waitEventCmd = new WaitEventCmd(scenario);
        this.labelCmd = new LabelCmd(scenario);
        this.exitCmd = new ExitCmd(scenario);
        this.customCmd = new CustomCmd(scenario);
    }

    resetFromJSON(o) {
        this.waitTimeCmd.resetFromJSON(o);
        this.waitEventCmd.resetFromJSON(o);
        this.labelCmd.resetFromJSON(o);
        this.exitCmd.resetFromJSON(o);
        this.customCmd.resetFromJSON(o);
        return this;
    }

    getHandler(cmdPack) {
        if (typeof (cmdPack) === 'string') {
            return this[CMDMAP[cmdPack]];
        }

        var name = cmdPack[0];
        if (name === 'wait') {
            var param = cmdPack[1];
            return (typeof (param) === 'number') ? this.waitTimeCmd : this.waitEventCmd;
        }

        if (CMDMAP.hasOwnProperty(name)) {
            var cmdName = CMDMAP[name];
            return this[cmdName];
        }
    }

    isValidCmdName(name) {
        if (name === 'wait') {
            return true;
        }
        return CMDMAP.hasOwnProperty(name);
    }
}

const CMDMAP = {
    '-': 'customCmd',
    'waittime': 'waitTimeCmd',
    'waitevent': 'waitEventCmd',
    'label': 'labelCmd',
    'tag': 'labelCmd',
    'exit': 'exitCmd'
}
export default CommandsManager;