import RenderMethods from './RenderMethods.js';
import Contains from './Contains.js';

var Methods = {
    contains: Contains,
}

Object.assign(
    Methods,
    RenderMethods
)

export default Methods;