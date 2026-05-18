class BaseCmd {
    scenario: any;
    type: any;

    constructor(scenario?: any, type?: any) {
        this.scenario = scenario;
        this.type = type;
    }

    resetFromJSON(o?: any) {}

    toJSON() {
        return {};
    }

    parse(inst?: any, index?: any) {
        return inst;
    }

    run(inst?: any) {}
}

export default BaseCmd;