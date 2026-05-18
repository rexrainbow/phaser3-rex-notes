import Compile from './Complile';

var Render = function(content?: any, view?: any, config?: any) {
    var f;
    if (typeof (content) === 'string') {
        f = Compile(content, config);
    } else {
        f = content;
    }

    return f(view);
}

export default Render;