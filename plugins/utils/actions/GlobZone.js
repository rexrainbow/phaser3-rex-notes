import NOOP from '../object/NOOP.js';
import { GameObjects as PhaserGameObjects } from 'phaser';
var globZone = new PhaserGameObjects.Zone({
    sys: {
        queueDepthSort: NOOP,
        events: {
            once: NOOP
        }
    }
}, 0, 0, 1, 1);
globZone.setOrigin(0);

export default globZone;