import { Action, } from '../../../behaviortree/index.js';

class ActivateAction extends Action {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                activateTreeTitle,
                services,
                title,
                properties = {},
                name = 'ActivateTree'
            } = config;

            super({
                name,
                title,
                properties: {
                    ...properties,
                    activateTreeTitle
                },
                services,
            });
        }

        this.activateTreeTitle = this.properties.activateTreeTitle;
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
