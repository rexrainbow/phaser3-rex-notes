'use strict'

import BaseCmd from './BaseCmd.js';
import Clean from './../../../utils/object/Clean.js';

class LabelCmd extends BaseCmd {
    constructor(scenario) {
        super(scenario, 'label');

        this.labels = {};
        this.prevLabel = "";
        this.lastLabel = "";
    }

    resetFromJSON(o) {
        Clean(this.labels);
        this.prevLabel = "";
        this.lastLabel = "";
    }

    parse(cmdPack, index) {
        var label = this.getLabel(cmdPack);
        this.addLabel(label, index);
        cmdPack.length = 2;
        return cmdPack;
    }

    run(cmdPack) {
        var label = this.getLabel(cmdPack);
        this.scenario.log("#LABEL: " + label);

        this.prevLabel = this.lastLabel;
        this.lastLabel = label;
        //this.scenario.resetClock(); // TODO
        var scenario = this.scenario;
        scenario.emit('labelchange', scenario, this.prevLabel, this.lastLabel);
    }

    getLabel(cmdPack) {
        return cmdPack[1];
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