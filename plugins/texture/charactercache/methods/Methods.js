import Load from './Load.js';
import Unlock from './Unlock.js';
import BitmapTextMethods from './BitmapTextMethods.js';

var Methods = {
    load: Load,
    unlock: Unlock,
}

Object.assign(
    Methods,
    BitmapTextMethods
);


export default Methods;