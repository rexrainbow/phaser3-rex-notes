import { Action, } from '../../../behaviortree/index';

class ActivateAction extends Action {
    activateTreeTitle: any;
    getTree: any;
    SUCCESS: any;

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

    tick(tick?: any) {
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