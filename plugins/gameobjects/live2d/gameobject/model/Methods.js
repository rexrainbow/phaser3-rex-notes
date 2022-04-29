import Setup from './Setup.js';
import Update from './Update.js';
import Draw from './Draw.js';

import GetExpressionNames from './GetExpressionNames.js';
import SetExpression from './SetExpression.js';
import SetRandomExpression from './SetRandomExpression.js';

import GetMotionNames from './GetMotionNames.js';
import StartMotion from './StartMotion.js';



var Methods = {
    setup: Setup,
    update: Update,
    draw: Draw,

    getExpressionNames: GetExpressionNames,
    setExpression: SetExpression,
    setRandomExpression: SetRandomExpression,

    getMotionNames: GetMotionNames,
    startMotion: StartMotion,
}

export default Methods;