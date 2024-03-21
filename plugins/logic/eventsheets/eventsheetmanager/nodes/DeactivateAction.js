import { Action, } from '../../../behaviortree/index.js';

class DeactivateAction extends Action {
    constructor({
        deactivateTreeTitle,
        services,
        title,
        name = 'DeactivateTree'
    } = {}) {

        super({
            name,
            title,
            properties: {
                deactivateTreeTitle
            },
            services,
        });

        this.deactivateTreeTitle = deactivateTreeTitle;
    }

    tick(tick) {
        var tree = this.getTree(tick);
        if (!this.deactivateTreeTitle || (this.deactivateTreeTitle === '')) {
            tree.setActive(false);
        } else {
            tree.treeManager.setEventSheetActiveState(this.deactivateTreeTitle, tree.groupName, false);
        }
        return this.SUCCESS;
    }
}

export default DeactivateAction;