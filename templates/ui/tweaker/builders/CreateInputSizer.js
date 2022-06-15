import Sizer from '../../sizer/Sizer.js';

var CreateInputSizer = function (scene, config, styles, gameObject) {
    if (!gameObject) {
        styles = styles.inputSizer || {};
        gameObject = new Sizer(scene, styles);
    }
    return gameObject;
}

export default CreateInputSizer;