import { Action, } from '../../../behaviortree/index.js';

class DeactivateAction extends Action {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                deactivateTreeTitle,
                services,
                title,
                properties = {},
                name = 'DeactivateTree'
            } = config;
            super({
                name,
                title,
                properties: {
                    ...properties,
                    deactivateTreeTitle
                },
                services,
            });
        }

        this.deactivateTreeTitle = this.properties.deactivateTreeTitle;
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
