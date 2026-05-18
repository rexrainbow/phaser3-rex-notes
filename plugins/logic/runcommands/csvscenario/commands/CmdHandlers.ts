import CustomCmd from './CustomCmd';
import WaitCmd from './WaitCmd';
import LabelCmd from './LabelCmd';
import ExitCmd from './ExitCmd';
import GotoCmd from './GotoCmd';
import IfCmd from './IfCmd';
import GetValue from '../../../../utils/object/GetValue';

class CmdHandlers {
    cmds: any;

    constructor(scenario?: any) {
        this.cmds = {
            '-': new CustomCmd(scenario),
            'wait': new WaitCmd(scenario),
            'label': new LabelCmd(scenario),
            'exit': new ExitCmd(scenario),
            'goto': new GotoCmd(scenario),
            'if': new IfCmd(scenario)
        };
    }

    resetFromJSON(o?: any) {
        for (var name in this.cmds) {
            this.cmds[name].resetFromJSON(GetValue(o, name, undefined));
        }
        return this;
    }

    toJSON() {
        var ret = {};
        for (var name in this.cmds) {
            ret[name] = this.cmds[name].toJSON();
        }
        return ret;
    }

    get(name?: any) {
        return this.cmds[name];
    }

    isValidCmdName(name?: any) {
        return this.cmds.hasOwnProperty(name);
    }
}
export default CmdHandlers;