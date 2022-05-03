import SetInteractive from './SetInteractive.js';
import WorldXYToModelXY from './WorldXYToModelXY.js';

import LookAt from './LookAt.js';
import LookForward from './LookForward.js';

import AutoPlayIdleMotion from './AutoPlayIdleMotion.js';

var Methods = {
    setInteractive: SetInteractive,
    getModelXY: WorldXYToModelXY,

    lookAt: LookAt,
    lookForward: LookForward,

    autoPlayIdleMotion: AutoPlayIdleMotion
}

export default Methods;