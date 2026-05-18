import { BreakAction as Base } from '../../../behaviortree/index'

class ContinueAction extends Base {
    constructor(config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.tag = 'continue';
        super(config);
    }

}

export default ContinueAction;