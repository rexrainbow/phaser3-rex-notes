import { BreakAction as Base } from '../../../behaviortree/index'

class BreakAction extends Base {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        config.tag = 'break';
        super(config);
    }

}

export default BreakAction;