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
        var eventsheet = this.getTree(tick);
        if (!this.activateTreeTitle || (this.activateTreeTitle === '')) {
            eventsheet.setActive(true);
        } else {
            eventsheet.eventSheetManager.setEventSheetActiveState(this.activateTreeTitle, eventsheet.groupName, true);
        }
        return this.SUCCESS;
    }
}

export default ActivateAction;