/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var CONST = require('./const');

/**
 * @namespace Phaser.Display.Align
 */

var Align = {

    In: require('./in'),
    To: require('./to')

};

//   Merge in the consts
Object.assign(
    Align,
    CONST
);


module.exports = Align;
