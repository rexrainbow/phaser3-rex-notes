import * as Const from '../../model/Const';

var StartMotion = function(group?: any, no?: any, priority?: any) {
    if (typeof (priority) === 'string') {
        priority = PriorityModes[priority];
    }
    this.model.startMotion(group, no, priority);
    return this;
}

const PriorityModes = {
    none: Const.PriorityNone,
    idle: Const.PriorityIdle,
    normal: Const.PriorityNormal,
    force: Const.PriorityForce
}

export default StartMotion;