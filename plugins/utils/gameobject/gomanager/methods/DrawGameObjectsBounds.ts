import DrawBounds from '../../../bounds/DrawBounds';

var DrawGameObjectsBounds = function(graphics?: any, config?: any) {
    this.forEachGO(function(gameObject?: any) {
        if (gameObject.drawBounds) {
            gameObject.drawBounds(graphics, config);
        } else {
            DrawBounds(gameObject, graphics, config);
        }
    });
    return this;
}

export default DrawGameObjectsBounds;