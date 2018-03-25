'use strict'

import IsFunction from './../object/IsFunction.js';
/**
 * Return event emmiter from scene, or gameobject
 * @returns {object} parent scene, or gameobject
 */
var GetEventEmmiter = function (parent) {
    if (parent == null) {
        return null;
    } else if (IsFunction(parent.on)) {  // gameobject.on
        return parent;
    } else if (parent.sys && parent.sys.events &&
        IsFunction(parent.sys.events.on)) {  // scene.systems.events.on
        return parent.sys.events;
    } else {
        return null;
    }
};

export default GetEventEmmiter;