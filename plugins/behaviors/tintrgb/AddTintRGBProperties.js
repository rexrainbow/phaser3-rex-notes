import { GetR, GetG, GetB } from '../../utils/color/GetRGB.js';
import { SetR, SetG, SetB, SetRGB } from '../../utils/color/SetColor.js';

var AddTintRGBProperties = function (gameObject, colorRGB) {
    // Don't attach properties again
    if (gameObject.hasOwnProperty('tintR')) {
        return gameObject;
    }

    if (colorRGB === undefined) {
        colorRGB = 0xffffff;
    }

    // Override tint property
    Object.defineProperty(gameObject, 'tint', {
        get: function () {
            return gameObject._tintRGB;
        },
        set: function (value) {
            value = Math.floor(value) & 0xffffff;
            gameObject.setTint(value);
            if (gameObject._tintRGB !== value) {
                gameObject._tintRGB = value;
                gameObject._tintR = GetR(value);
                gameObject._tintG = GetG(value);
                gameObject._tintB = GetB(value);
                // gameObject.emit('_tintchange', value, gameObject._tintR, gameObject._tintG, gameObject._tintB);
            }
        }
    });

    Object.defineProperty(gameObject, 'tintR', {
        get: function () {
            return gameObject._tintR;
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if (gameObject._tintR !== value) {
                gameObject._tintR = value;
                gameObject._tintRGB = SetR(gameObject._tintRGB, value);
                gameObject.tint = gameObject._tintRGB;
            }
        },
    })
    Object.defineProperty(gameObject, 'tintG', {
        get: function () {
            return gameObject._tintG;
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if (gameObject._tintG !== value) {
                gameObject._tintG = value;
                gameObject._tintRGB = SetG(gameObject._tintRGB, value);
                gameObject.tint = gameObject._tintRGB;
            }
        },
    })
    Object.defineProperty(gameObject, 'tintB', {
        get: function () {
            return gameObject._tintB;
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if (gameObject._tintB !== value) {
                gameObject._tintB = value;
                gameObject._tintRGB = SetB(gameObject._tintRGB, value);
                gameObject.tint = gameObject._tintRGB;
            }
        },
    })
    Object.defineProperty(gameObject, 'tintGray', {
        get: function () {
            return Math.floor((gameObject._tintR + gameObject._tintG + gameObject._tintB) / 3);
        },
        set: function (value) {
            value = Math.floor(value) & 0xff;
            if ((gameObject._tintR !== value) || (gameObject._tintG !== value) || (gameObject._tintB !== value)) {
                gameObject._tintR = value;
                gameObject._tintG = value;
                gameObject._tintB = value;
                gameObject._tintRGB = SetRGB(gameObject._tintRGB, value, value, value);
                gameObject.tint = gameObject._tintRGB;
            }
        },
    })

    gameObject.tint = colorRGB;

    return gameObject;
}

export default AddTintRGBProperties;