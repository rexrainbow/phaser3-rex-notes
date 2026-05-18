import Load from './Load';
import Unlock from './Unlock';
import GetAllData from './GetAllData';
import Clear from './Clear';
import BitmapTextMethods from './BitmapTextMethods';

var Methods = {
    load: Load,
    unlock: Unlock,
    getAllData: GetAllData,
    clear: Clear,
}

Object.assign(
    Methods,
    BitmapTextMethods
);


export default Methods;