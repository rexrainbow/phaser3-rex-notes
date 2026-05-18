import AddChildMethods from './AddChildMethods';
import GetPage from './GetPage';
import SwapPage from './SwapPage';
import HasPage from './HasPage';

var methods = {
    getPage: GetPage,
    swapPage: SwapPage,
    hasPage: HasPage,
}

Object.assign(
    methods,
    AddChildMethods,
);

export default methods;