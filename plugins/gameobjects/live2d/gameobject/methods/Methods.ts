import SetModel from './SetModel';

import GetExpressionNames from './expression/GetExpressionNames';
import SetExpression from './expression/SetExpression';
import SetRandomExpression from './expression/SetRandomExpression';

import GetMotionNames from './motion/GetMotionNames';
import GetMotionGroupNames from './motion/GetMotionGroupNames';
import StartMotion from './motion/StartMotion';
import StopAllMotions from './motion/StopAllMotions';
import GetPlayinigMotionNames from './motion/GetPlayinigMotionNames';
import IsAnyMotionPlaying from './motion/IsAnyMotionPlaying';
import AutoPlayIdleMotion from './motion/AutoPlayIdleMotion';

import RegisterParameter from './parameter/RegisterParameter';
import AddParameterValue from './parameter/AddParameterValue';
import ResetParameterValue from './parameter/ResetParameterValue';
import GetParameters from './parameter/GetParameters';
import LookAt from './parameter/LookAt';
import LookForward from './parameter/LookForward';

import SetLipSyncValue from './lipsync/SetLipSyncValue';

import SetInteractive from './interactive/SetInteractive';
import GetHitTestResult from './interactive/GetHitTestResult';
import HitTest from './interactive/HitTest';

import GetModelXY from './position/WorldXYToModelXY';

import SetTimeScale from './SetTimeScale';


var Methods = {
    setModel: SetModel,

    getExpressionNames: GetExpressionNames,
    setExpression: SetExpression,
    setRandomExpression: SetRandomExpression,

    getMotionNames: GetMotionNames,
    getMotionGroupNames: GetMotionGroupNames,
    startMotion: StartMotion,
    stopAllMotions: StopAllMotions,
    getPlayinigMotionNames: GetPlayinigMotionNames,
    isAnyMotionPlaying: IsAnyMotionPlaying,
    autoPlayIdleMotion: AutoPlayIdleMotion,

    registerParameter: RegisterParameter,
    addParameterValue: AddParameterValue,
    resetParameterValue: ResetParameterValue,
    getParameters: GetParameters,
    lookAt: LookAt,
    lookForward: LookForward,

    setLipSyncValue: SetLipSyncValue,

    setInteractive: SetInteractive,
    getHitTestResult: GetHitTestResult,
    hitTest: HitTest,

    getModelXY: GetModelXY,

    setTimeScale: SetTimeScale,
}



export default Methods;