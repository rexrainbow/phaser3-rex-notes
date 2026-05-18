import { SetPadding as SetPaddingBase } from '../../../../utils/padding/PaddingMethods';

var SetPadding = function(key?: any, value?: any) {
    SetPaddingBase(this.padding, key, value);

    return this;
};

export default SetPadding;