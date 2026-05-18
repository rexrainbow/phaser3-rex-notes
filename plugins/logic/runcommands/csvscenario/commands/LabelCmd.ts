import BaseCmd from './BaseCmd';
import Clone from '../../../../utils/object/Clone';
import Clear from '../../../../utils/object/Clear';
import GetValue from '../../../../utils/object/GetValue';

class LabelCmd extends BaseCmd {
    prevLabel: any;
    scenario: any;

    constructor(scenario?: any) {
        super(scenario, 'label');

        this.labels = {};
        this.prevLabel = '';
        this.lastLabel = '';
    }

    resetFromJSON(o?: any) {
        this.prevLabel = GetValue(o, 'preLabel', '');
        this.lastLabel = GetValue(o, 'lastLabel', '');
        var labels = GetValue(o, 'labels', undefined);
        if (labels === undefined) {
            Clear(this.labels);
        } else {
            Clone(labels, this.labels);
        }
    }

    toJSON() {
        return {
            preLabel: this.prevLabel,
            lastLabel: this.lastLabel,
            labels: this.labels
        };
    }

    parse(inst?: any, index?: any) {
        inst.length = 2;
        var label = this.getLabel(inst);
        this.addLabel(label, index);
        return inst;
    }

    run(inst?: any) {
        var label = this.getLabel(inst);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#LABEL: ' + label);
        }

        this.prevLabel = this.lastLabel;
        this.lastLabel = label;
        //this.scenario.resetClock(); // TODO
        var scenario = this.scenario;
        scenario.emit('labelchange', this.lastLabel, this.prevLabel, scenario.scope, scenario);
    }

    getLabel(inst?: any) {
        var label = inst[1];
        if (label == null) {
            label = '';
            inst[1] = label;
        }
        return label;
    }

    addLabel(name?: any, index?: any) {
        this.labels[name] = index;
    }

    getIndex(name?: any) {
        if ((name === '') || !this.hasLabel(name)) {
            return 0;
        }
        return this.labels[name];
    }

    hasLabel(name?: any) {
        return this.labels.hasOwnProperty(name);
    }
}

export default LabelCmd;