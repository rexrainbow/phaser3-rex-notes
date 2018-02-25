'use strict'

import IsFunction from './object/IsFunction.js';
/**
 * Return event emmiter from gameobject,scene, or game
 * @returns {object} parent gameobject,scene, or game
 */
var GetEventEmmiter = function (parent) {
    if (parent == null) {
        return null;
    } else if (IsFunction(parent.on)) {  // gameobject.on
        return parent;
    } else if (parent.systems && parent.systems.events &&
        IsFunction(parent.systems.events.on)) {  // scene.systems.events.on
        return parent.systems.events;
    } else if (parent.events &&
        IsFunction(parent.events.on)) {  // game.events.on
        return parent.events;
    } else {
        return null;
    }
};

export default GetEventEmmiter;