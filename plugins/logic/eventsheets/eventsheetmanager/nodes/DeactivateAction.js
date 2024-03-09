import { Action, } from '../../../behaviortree/index.js';

class DeactivateAction extends Action {
    tick(tick) {
        this.getTree(tick).setActive(false);
        return this.SUCCESS;
    }
}

export default DeactivateAction;