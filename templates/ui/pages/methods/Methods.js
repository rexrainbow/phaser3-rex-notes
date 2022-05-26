import AddChildMethods from './AddChildMethods.js';
import GetPage from './GetPage.js';
import SwapPage from './SwapPage.js';

var methods = {
    getPage: GetPage,
    swapPage: SwapPage
}

Object.assign(
    methods,
    AddChildMethods,
);

export default methods;