import SimpleLineProgress from '../../simplelineprogress/SimpleLineProgress.js';

var CreateBar = function (scene, config) {
    var bar = new SimpleLineProgress(scene, config);
    scene.add.existing(bar);
    return bar;
}

export default CreateBar;