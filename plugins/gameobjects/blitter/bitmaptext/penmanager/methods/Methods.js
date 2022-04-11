import AddImageBob from './AddImageBob.js';
import RemovePenMethods from './RemovePenMethods.js';
import AddTextPens from './AddTextPens.js';

var Methods = {
    addImageBob: AddImageBob,
    ...RemovePenMethods,

    addTextPens: AddTextPens,
}

export default Methods;