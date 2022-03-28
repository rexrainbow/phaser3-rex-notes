import BlitterBase from '../blitterbase/BlitterBase.js'
import Methods from './methods/Methods.js';

class Blitter extends BlitterBase {

}

Object.assign(
    Blitter.prototype,
    Methods
);

export default Blitter;