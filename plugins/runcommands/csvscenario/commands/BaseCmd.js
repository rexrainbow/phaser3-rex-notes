'use strict'
class BaseCmd {
    constructor(scenario, type) {
        this.scenario = scenario;
        this.type = type;
    }

    resetFromJSON(o) {}

    parse(inst, index) {
        return inst;
    }

    run(inst) {}
}

export default BaseCmd;