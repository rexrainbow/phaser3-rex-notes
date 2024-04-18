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
        var eventsheet = this.getTree(tick);
        if (!this.deactivateTreeTitle || (this.deactivateTreeTitle === '')) {
            eventsheet.setActive(false);
        } else {
            eventsheet.eventSheetManager.setEventSheetActiveState(this.deactivateTreeTitle, eventsheet.groupName, false);
        }
        return this.SUCCESS;
    }
}

export default DeactivateAction;