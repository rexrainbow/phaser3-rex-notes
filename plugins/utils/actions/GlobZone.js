import NOOP from '../object/NOOP.js';
import { GameObjects } from "phaser";

var globZone = new GameObjects.Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
globZone.setOrigin(0);

export default globZone;