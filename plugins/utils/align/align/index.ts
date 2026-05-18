import AlignIn from './in/index';
import AlignTo from './to/index';
import CONST from './const';

var Align = {
    In: AlignIn,
    To: AlignTo
};

//   Merge in the consts
Object.assign(
    Align,
    CONST
);


export default Align;