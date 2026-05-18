import BaseCmd from './BaseCmd';

class ExitCmd extends BaseCmd {
    scenario: any;

    constructor(scenario?: any) {
        super(scenario, 'exit');
    }

    parse(inst?: any, index?: any) {
        inst.length = 1;
        return inst;
    }

    run(inst?: any) {
        this.scenario.log('#EXIT');
        this.scenario.complete();         
    }
}

export default ExitCmd;