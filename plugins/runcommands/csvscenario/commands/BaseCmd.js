'use strict'
class BaseCmd {
    constructor(scenario) {
        this.scenario = scenario;
    }

    resetFromJSON(o) {}

    parse(cmdPack, index) {
        return cmdPack;
    }

    run(cmdPack) {}
}

export default BaseCmd;