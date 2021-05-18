import { GetR, GetG, GetB } from '../../utils/color/GetRGB.js';
import { SetR, SetG, SetB, SetRGB } from '../../utils/color/SetColor.js';

var AddTintRGBProperties = function (gameObject, tintRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('_tintRGB')) {
        return gameObject;
    }

    if (tintRGB === undefined) {
        tintRGB = 0xffffff;
    }
    gameObject._tintRGB = tintRGB;

    Object.defineProperty(gameObject, 'tintRGB', {
        get: function () {
            return gameObject._tintRGB;
        },
        set: function (value) {
            value = Math.floor(value);
            gameObject._tintRGB = value;
            gameObject.tint = gameObject._tintRGB;
        },
    })
    Object.defineProperty(gameObject, 'tintR', {
        get: function () {
            return GetR(gameObject._tintRGB);
        },
        set: function (value) {
            value = Math.floor(value);
            gameObject._tintRGB = SetR(gameObject._tintRGB, value);
            gameObject.tint = gameObject._tintRGB;
        },
    })
    Object.defineProperty(gameObject, 'tintG', {
        get: function () {
            return GetG(gameObject._tintRGB);
        },
        set: function (value) {
            value = Math.floor(value);
            gameObject._tintRGB = SetG(gameObject._tintRGB, value);
            gameObject.tint = gameObject._tintRGB;
        },
    })
    Object.defineProperty(gameObject, 'tintB', {
        get: function () {
            return GetB(gameObject._tintRGB);
        },
        set: function (value) {
            value = Math.floor(value);
            gameObject._tintRGB = SetB(gameObject._tintRGB, value);
            gameObject.tint = gameObject._tintRGB;
        },
    })
    Object.defineProperty(gameObject, 'tintGray', {
        get: function () {
            return Math.floor((GetR(gameObject._tintRGB) + GetB(gameObject._tintRGB) + GetB(gameObject._tintRGB)) / 3);
        },
        set: function (value) {
            value = Math.floor(value);
            gameObject._tintRGB = SetRGB(gameObject._tintRGB, value, value, value);
            gameObject.tint = gameObject._tintRGB;
        },
    })
    return gameObject;
}

export default AddTintRGBProperties;