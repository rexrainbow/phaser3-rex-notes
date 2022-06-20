import AddMethods from './AddMethods.js';
import RemoveMethods from './RemoveMethods.js';
import PropertyMethods from './PropertyMethods.js';
import AnimationMethods from './AnimationMethods.js';

var Methods = {}
Object.assign(
    Methods,
    AddMethods,
    RemoveMethods,
    PropertyMethods,
    AnimationMethods
)

export default Methods;