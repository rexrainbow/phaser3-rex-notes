import Setup from './setup/Setup';
import Update from './update/Update';
import Draw from './draw/Draw';

import GetExpressionNames from './expression/GetExpressionNames';
import SetExpression from './expression/SetExpression';
import SetRandomExpression from './expression/SetRandomExpression';

import GetMotionNames from './motion/GetMotionNames';
import GetMotionGroupNames from './motion/GetMotionGroupNames';
import StartMotion from './motion/StartMotion';
import StopAllMotions from './motion/StopAllMotions';
import IsAnyMotionPlaying from './motion/IsAnyMotionPlaying';
import GetPlayinigMotionNames from './motion/GetPlayinigMotionNames';

import RegisterParameter from './parameter/RegisterParameter';
import AddParameterValue from './parameter/AddParameterValue';
import ResetParameterValue from './parameter/ResetParameterValue';

import LocalXYToModelMatrixXY from './position/LocalXToModelMatrixX';
import GetDrawableBounds from './hitarea/GetDrawableBounds';
import HitTest from './hitarea/HitTest';

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

    localXYToModelMatrixXY: LocalXYToModelMatrixXY,
    getDrawableBounds: GetDrawableBounds,
    hitTest: HitTest,
}

export default Methods;