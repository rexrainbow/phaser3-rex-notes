import AddMethods from './AddMethods.js';
import RemoveMethods from './RemoveMethods.js';
import PropertyMethods from './PropertyMethods.js';

var Methods = {}
Object.assign(
    Methods,
    AddMethods,
    RemoveMethods,
    PropertyMethods,
)

export default Methods;