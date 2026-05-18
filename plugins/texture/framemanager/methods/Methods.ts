import Draw from './Draw';
import Paste from './Paste';
import AddEmptyFrame from './AddEmptyFrame';
import RemoveMethods from './RemoveMethods';
import AddToBitmapFont from './AddToBitmapFont';

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