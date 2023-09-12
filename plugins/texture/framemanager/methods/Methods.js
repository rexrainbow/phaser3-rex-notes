import Draw from './Draw.js';
import Paste from './Paste.js';
import AddEmptyFrame from './AddEmptyFrame.js';
import RemoveMethods from './RemoveMethods.js';
import AddToBitmapFont from './AddToBitmapFont.js';

var methods = {
    draw: Draw,
    paste: Paste,
    addEmptyFrame: AddEmptyFrame,

    addToBitmapFont: AddToBitmapFont,
}

Object.assign(
    methods,
    RemoveMethods
);

export default methods