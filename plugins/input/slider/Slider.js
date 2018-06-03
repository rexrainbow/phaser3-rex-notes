'use strict'

import GetSceneObject from './../../utils/system/GetSceneObject.js';
import IsArray from './../../utils/array/IsArray.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const Linear = Phaser.Math.Linear;

class Slider {
    constructor(gameobject, config) {
        this.gameobject = gameobject;
        this.scene = GetSceneObject(gameobject);

        this._value = 0;
        this.endpoints = [{
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 0
            }
        ];
        this.dragEnable = null;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        var endpoints = GetValue(o, "endPoints", undefined);
        if (endpoints !== undefined) {
            this.setEndPoints(endpoints);
        }
        this.setValue(GetValue(o, "value", 0));
        this.setDragEnable(GetValue(o, "dragEnable", true));
        return this;
    }

    toJSON() {
        return {
            enable: this.enable
        };
    }

    boot() {
        if (this.gameobject.on) {
            this.gameobject.on('drag', this.onDragging, this);
            this.gameobject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.gameobject = undefined;
        this.scene = undefined;
        // gameobject event 'drag' will be removed when this gameobject destroyed 
    }

    destroy() {
        this.shutdown();
    }

    setDragEnable(e) {
        if (this.dragEnable === null) {
            this.gameobject.setInteractive(); // only need setInteractive once
        }

        e = !!e;
        if (this.dragEnable === e) {
            return this;
        }

        this.dragEnable = e;
        this.scene.input.setDraggable(this.gameobject, e);
        return this;
    }

    setEndPoints(p0x, p0y, p1x, p1y) {
        var points = this.endpoints;
        if (typeof (p0x) === 'number') {
            points[0].x = p0x;
            points[0].y = p0y;
            points[1].x = p1x;
            points[1].y = p1y;
        } else if (IsArray(p0x)) { // single array with 2 points
            points[0] = p0x[0];
            points[1] = p0x[1];
        } else {
            points[0] = p0x;
            points[1] = p0y;
        }
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = Clamp(value, 0, 1);

        var gameobject = this.gameobject;
        var points = this.endpoints;
        gameobject.x = Linear(points[0].x, points[1].x, this._value);
        gameobject.y = Linear(points[0].y, points[1].y, this._value);
    }

    setValue(value) {
        this.value = value;
    }

    getValue(min, max) {
        if (min === undefined) {
            return this.value;
        } else {
            return Linear(min, max, this.value);
        }
    }

    onDragging(pointer, dragX, dragY) {
        var gameobject = this.gameobject;
    }
}

export default Slider;