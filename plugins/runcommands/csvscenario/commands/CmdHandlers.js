'use strict'
import CustomCmd from './CustomCmd.js';
import WaitCmd from './WaitCmd.js';
import WaitTimeCmd from './WaitTimeCmd.js';
import WaitEventCmd from './WaitEventCmd.js';
import LabelCmd from './LabelCmd.js';
import ExitCmd from './ExitCmd.js';
import GotoCmd from './GotoCmd.js';

class CmdHandlers {
    constructor(scenario) {
        this.cmds = {
            '-': new CustomCmd(scenario),
            'wait': new WaitCmd(scenario),
            'waittime': new WaitTimeCmd(scenario),
            'waitevent': new WaitEventCmd(scenario),
            'label': new LabelCmd(scenario),
            'exit': new ExitCmd(scenario),
            'goto': new GotoCmd(scenario)
        };
    }

    resetFromJSON(o) {
        for (var name in this.cmds) {
            this.cmds[name].resetFromJSON(o);
        }
        return this;
    }

    get(name) {
        return this.cmds[name];
    }

    isValidCmdName(name) {
        return this.cmds.hasOwnProperty(name);
    }
}
export default CmdHandlers;