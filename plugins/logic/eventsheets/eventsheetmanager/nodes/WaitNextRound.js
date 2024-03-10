import { Wait, RUNNING } from '../../../behaviortree';

class WaitNextRound extends Wait {
    constructor({
        duration = 1,
        services,
        title,
        name = 'NextRound'
    } = {}) {
        super({
            duration,
            services,
            title,
            name,
        });
    }

    tick(tick) {
        var state = super.tick(tick);

        if (state === RUNNING) {
            this.getTree(tick).roundComplete = true;
        }

        return state;
    }
}

export default WaitNextRound;