import { Action, } from '../../../behaviortree/index.js';

class ActivateAction extends Action {
    constructor({
        activateTreeTitle,
        services,
        title,
        name = 'ActivateTree'
    } = {}) {

        super({
            name,
            title,
            properties: {
                activateTreeTitle
            },
            services,
        });

        this.activateTreeTitle = activateTreeTitle;
    }

    tick(tick) {
        var tree = this.getTree(tick);
        if (!this.activateTreeTitle || (this.activateTreeTitle === '')) {
            tree.setActive(true);
        } else {
            tree.treeManager.setTreeActiveState(this.activateTreeTitle, tree.groupName, true);
        }
        return this.SUCCESS;
    }
}

export default ActivateAction;