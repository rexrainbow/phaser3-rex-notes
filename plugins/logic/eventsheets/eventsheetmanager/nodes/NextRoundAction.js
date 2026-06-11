import Action from '../../../behaviortree/nodes/Action.js';
import { SUCCESS, RUNNING } from '../../../behaviortree/constants.js';
import { EVT_EVENTSHEET_ROUND_BREAK } from '../constants.js';

class NextRoundAction extends Action {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                services,
                title,
                properties,
                name = 'NextRound'
            } = config;

            super({
                services,
                title,
                properties,
                name,
            });
        }
    }

    open(tick) {
        this.getNodeMemory(tick).$waitNextRound = false;
    }

    tick(tick) {
        var nodeMemory = this.getNodeMemory(tick);

        if (!nodeMemory.$waitNextRound) {  // First tick, invoke breakRound
            nodeMemory.$waitNextRound = true;

            var eventSheet = this.getTree(tick);
            if (eventSheet && eventSheet.breakRound) {
                eventSheet.breakRound();
                eventSheet.eventSheetManager.emit(
                    EVT_EVENTSHEET_ROUND_BREAK,
                    eventSheet.title,
                    eventSheet.groupName,
                    eventSheet.eventSheetManager,
                    eventSheet,
                    this,
                    eventSheet.eventSheetGroup
                );
            }
            return RUNNING;

        } else {  // Next tick(next round), continue next action
            nodeMemory.$waitNextRound = false;
            return SUCCESS;

        }


    }

    close(tick) {
        this.getNodeMemory(tick).$waitNextRound = false;
    }
}

export default NextRoundAction;
