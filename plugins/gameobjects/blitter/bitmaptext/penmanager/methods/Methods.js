import RemovePenMethods from './RemovePenMethods.js';
import AddTextPens from './AddTextPens.js';

var Methods = {
    addTextPens: AddTextPens,
}

Object.assign(
    Methods,
    RemovePenMethods
);

export default Methods;