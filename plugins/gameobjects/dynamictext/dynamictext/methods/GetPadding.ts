import { GetPadding as GetPaddingBase } from '../../../../utils/padding/PaddingMethods';

var GetPadding = function(key?: any) {
    return GetPaddingBase(this.padding, key);
}

export default GetPadding;