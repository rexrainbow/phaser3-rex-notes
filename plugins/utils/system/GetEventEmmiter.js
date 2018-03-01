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
    } else if (parent.systems && parent.systems.events &&
        IsFunction(parent.systems.events.on)) {  // scene.systems.events.on
        return parent.systems.events;
    } else {
        return null;
    }
};

export default GetEventEmmiter;