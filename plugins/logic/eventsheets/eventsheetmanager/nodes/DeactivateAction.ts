import { Action, } from '../../../behaviortree/index';

class DeactivateAction extends Action {
    deactivateTreeTitle: any;
    getTree: any;
    SUCCESS: any;

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

    tick(tick?: any) {
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