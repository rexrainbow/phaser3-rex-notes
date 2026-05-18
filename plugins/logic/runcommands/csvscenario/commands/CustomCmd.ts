import BaseCmd from './BaseCmd';
import GetValue from '../../../../utils/object/GetValue';
import RunCommands from '../../../../runcommands';
import TypeConvert from '../../../../utils/string/TypeConvert';
import SpliceOne from '../../../../utils/array/SpliceOne';

class CustomCmd extends BaseCmd {
    lastMethodName: any;
    scenario: any;
    task: any;

    constructor(scenario?: any) {
        super(scenario, '-');
        this.task = undefined;
        this.lastMethodName = undefined;
    }

    resetFromJSON(o?: any) {
        if (this.task) {
            this.task.off('complete', this.resume, this);
            this.task = undefined;
        }
    }

    parse(inst?: any, index?: any) {
        var cmd = SpliceOne(inst, 0);

        var scenario = this.scenario;
        var argsConvert = scenario.argsConvert;
        var argsConvertScope = scenario.argsConvertScope;
        if (argsConvert?: any) {
            if (argsConvert === true) {
                argsConvert = TypeConvert;
                argsConvertScope = undefined;
            }
            for (var i = 1, len = inst.length; i < len; i++) {
                if (argsConvertScope?: any) {
                    inst[i] = argsConvert.call(argsConvertScope, inst[i], inst);
                } else {
                    inst[i] = argsConvert(inst[i], inst);
                }
            }
        }

        inst = [cmd, inst];
        return inst;
    }

    run(inst?: any) {
        if (!this.validate(inst)) {
            this.scenario.error(`Command '${GetFunctionName(inst)}' is not found in scope`);
            return;
        }

        var command = inst[1];
        this.lastMethodName = command[0];
        var task = RunCommands(command, this.scenario.scope);
        if (task && (typeof (task.once) === 'function')) {
            task.once('complete', this.resume, this);
            this.pause();
            this.task = task;
        } else {
            this.task = undefined;
        }
    }

    validate(inst?: any) {
        var fnName = GetFunctionName(inst);
        if (fnName === null) {
            return false;
        }

        var scope = this.scenario.scope;
        var fn = scope[fnName];
        if (fn == null) {
            fn = GetValue(scope, fnName, null);
        }
        return !!fn;
    }

    pause() {
        this.scenario.pause();
    }

    resume() {
        this.task = undefined;
        var scenario = this.scenario
        scenario.resume();
        scenario.runNextCmd();
    }
}

var GetFunctionName = function(inst?: any) {
    var command = inst[1];
    if (!command) {
        return null;
    }

    var fnName = command[0];
    if (!fnName) {
        return null;
    }

    return fnName;
}

export default CustomCmd;