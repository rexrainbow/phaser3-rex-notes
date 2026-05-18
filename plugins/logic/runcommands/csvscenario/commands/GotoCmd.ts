import BaseCmd from './BaseCmd';

class GotoCmd extends BaseCmd {
    scenario: any;

    constructor(scenario?: any) {
        super(scenario, 'goto');
    }

    parse(inst?: any, index?: any) {
        inst.length = 2;
        return inst;
    }

    run(inst?: any) {
        var label = this.getLabel(inst);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#GOTO label: ' + label);
        }
        this.scenario.goto(label);
    }

    getLabel(inst?: any) {
        var label = inst[1];
        if (label == null) {
            label = '';
            inst[1] = label;
        }
        return label;
    }
}

export default GotoCmd;