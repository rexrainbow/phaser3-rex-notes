'use strict'
import CustomCmd from './CustomCmd.js';
import WaitCmd from './WaitCmd.js';
import WaitTimeCmd from './WaitTimeCmd.js';
import WaitEventCmd from './WaitEventCmd.js';
import LabelCmd from './LabelCmd.js';
import ExitCmd from './ExitCmd.js';

class CmdHandlers {
    constructor(scenario) {
        this.customCmd = new CustomCmd(scenario);
        this.waitCmd = new WaitCmd(scenario);
        this.waitTimeCmd = new WaitTimeCmd(scenario);
        this.waitEventCmd = new WaitEventCmd(scenario);
        this.labelCmd = new LabelCmd(scenario);
        this.exitCmd = new ExitCmd(scenario);

    }

    resetFromJSON(o) {
        this.customCmd.resetFromJSON(o);
        this.waitCmd.resetFromJSON(o);
        this.waitTimeCmd.resetFromJSON(o);
        this.waitEventCmd.resetFromJSON(o);
        this.labelCmd.resetFromJSON(o);
        this.exitCmd.resetFromJSON(o);
        return this;
    }

    get(name) {
        if (CMDMAP.hasOwnProperty(name)) {
            return this[CMDMAP[name]];
        }
        return null;
    }

    isValidCmdName(name) {
        return CMDMAP.hasOwnProperty(name);
    }
}

const CMDMAP = {
    '-': 'customCmd',
    'wait': 'waitCmd',
    'waittime': 'waitTimeCmd',
    'waitevent': 'waitEventCmd',
    'label': 'labelCmd',
    'tag': 'labelCmd',
    'exit': 'exitCmd'
}
export default CmdHandlers;