import Sizer from '../../sizer/Sizer';

var CreatExpandContainer = function(scene?: any, orientation?: any) {
    var container = new Sizer(scene, {
        orientation: orientation
    })
    scene.add.existing(container);
    return container;
}

export default CreatExpandContainer;