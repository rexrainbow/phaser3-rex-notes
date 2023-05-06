import { IfSelector } from '../../behaviortree';

class EventCondition extends IfSelector {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        // Always return PENDING instead of RUNNING, or SUCCESS
        config.returnPending = true;

        super(config);
    }
}

export default EventCondition;