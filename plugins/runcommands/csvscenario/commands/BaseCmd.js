'use strict'
class BaseCmd {
    constructor(scenario, type) {
        this.scenario = scenario;
        this.type = type;
    }

    resetFromJSON(o) {}

    parse(cmdPack, index) {
        return cmdPack;
    }

    run(cmdPack) {}
}

export default BaseCmd;