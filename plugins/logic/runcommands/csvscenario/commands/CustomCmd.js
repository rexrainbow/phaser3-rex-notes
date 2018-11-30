import BaseCmd from './BaseCmd.js';
import RunCommands from '../../../../runcommands.js';
import TypeConvert from '../../../../utils/string/TypeConvert.js';

const SpliceOne = Phaser.Utils.Array.SpliceOne;

class CustomCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, '-');
        this.task = undefined;
    }

    resetFromJSON(o) {
        if (this.task) {
            this.task.off('complete', this.resume, this);
            this.task = undefined;
        }
    }

    parse(inst, index) {
        var cmd = SpliceOne(inst, 0);

        var scenario = this.scenario;
        var argsConvert = scenario.argsConvert;
        var argsConvertScope = scenario.argsConvertScope;
        if (argsConvert) {            
            if (argsConvert === true) {
                argsConvert = TypeConvert;
                argsConvertScope = undefined;
            }
            for (var i = 1, len = inst.length; i < len; i++) {
                if (argsConvertScope) {
                    inst[i] = argsConvert.call(argsConvertScope, inst[i], inst);
                } else {
                    inst[i] = argsConvert(inst[i], inst);
                }
            }
        }

        inst = [cmd, inst];
        return inst;
    }

    run(inst) {
        var scenario = this.scenario;
        var task = RunCommands(inst[1], scenario.scope);
        if (task && (typeof (task.once) === 'function')) {
            task.once('complete', this.resume, this);
            this.pause();
            this.task = task;
        } else {
            this.task = undefined;
        }
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

var CMD = [];

export default CustomCmd;