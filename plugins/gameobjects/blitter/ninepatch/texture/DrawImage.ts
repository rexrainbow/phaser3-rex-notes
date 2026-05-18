import AddImage from '../../blitterbase/utils/AddImage';

var DrawImage = function(key?: any, frame?: any, x?: any, y?: any, width?: any, height?: any) {
    AddImage(this, {
        frame: frame,
        x: x,
        y: y,
        width: width,
        height: height
    })
}

export default DrawImage;