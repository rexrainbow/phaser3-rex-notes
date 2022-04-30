import Setup from './Setup.js';
import Update from './Update.js';
import Draw from './Draw.js';

import GetExpressionNames from './GetExpressionNames.js';
import SetExpression from './SetExpression.js';
import SetRandomExpression from './SetRandomExpression.js';

import GetMotionNames from './GetMotionNames.js';
import GetMotionGroupNames from './GetMotionGroupNames.js';
import StartMotion from './StartMotion.js';
import StopAllMotions from './StopAllMotions.js';
import IsAnyMotionPlaying from './IsMotionPlaying.js';
import GetPlayinigMotionNames from './GetPlayinigMotionNames.js';

import RegisterParameter from './RegisterParameter.js';
import AddParameterValue from './AddParameterValue.js';
import ResetParameterValue from './ResetParameterValue.js';

var Methods = {
    setup: Setup,
    update: Update,
    draw: Draw,

    getExpressionNames: GetExpressionNames,
    setExpression: SetExpression,
    setRandomExpression: SetRandomExpression,

    getMotionNames: GetMotionNames,
    getMotionGroupNames: GetMotionGroupNames,
    startMotion: StartMotion,
    stopAllMotions: StopAllMotions,
    isAnyMotionPlaying: IsAnyMotionPlaying,
    getPlayinigMotionNames: GetPlayinigMotionNames,

    registerParameter: RegisterParameter,
    addParameterValue: AddParameterValue,
    resetParameterValue: ResetParameterValue,
}

export default Methods;