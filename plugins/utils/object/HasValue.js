/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Determine whether the source object has a property with the specified key.
 *
 * @function Phaser.Utils.Objects.HasValue
 * @since 3.0.0
 *
 * @param {object} source - The source object to be checked.
 * @param {string} key - The property to check for within the object
 *
 * @return {boolean} `true` if the provided `key` exists on the `source` object, otherwise `false`.
 */
var HasValue = function (source, key) {
    if (!source || typeof source === 'number') {
        return false;
    }
    else if (source.hasOwnProperty(key)) {
        return true;
    }
    else if (key.indexOf('.') !== -1) {
        var keys = key.split('.');
        var parent = source;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            if (parent.hasOwnProperty(keys[i])) {
                parent = parent[keys[i]];
            }
            else {
                //  Can't go any further
                return false;
            }
        }

        return true;
    }
    else {
        return false;
    }
};

export default HasValue;
