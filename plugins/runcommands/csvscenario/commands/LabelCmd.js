'use strict'

import BaseCmd from './BaseCmd.js';
import Clean from './../../../utils/object/Clean.js';

class LabelCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'label');

        this.labels = {};
        this.labels = {};
        this.prevLabel = '';
        this.lastLabel = '';
    }

    resetFromJSON(o) {
        Clean(this.labels);
        this.prevLabel = '';
        this.lastLabel = '';
        this.scenario.cmdQueue.customData.labels = this.labels;
    }

    parse(cmdPack, index) {
        cmdPack.length = 2;        
        var label = this.getLabel(cmdPack);
        this.addLabel(label, index);
        return cmdPack;
    }

    run(cmdPack) {
        var label = this.getLabel(cmdPack);
        if (this.scenario.isDebugMode) {
            this.scenario.log('#LABEL: ' + label);
        }

        this.prevLabel = this.lastLabel;
        this.lastLabel = label;
        //this.scenario.resetClock(); // TODO
        var scenario = this.scenario;
        scenario.emit('labelchange', scenario, this.prevLabel, this.lastLabel);
    }

    getLabel(cmdPack) {
        var label = cmdPack[1];
        if (label == null) {
            label = '';
            cmdPack[1] = label;
        }
        return label;
    }

    addLabel(name, index) {
        this.labels[name] = index;
    }

    getIndex(name) {
        if ((name === '') || !this.hasLabel(name)) {
            return 0;
        }
        return this.labels[name];
    }

    hasLabel(name) {
        return this.labels.hasOwnProperty(name);
    }
}

export default LabelCmd;