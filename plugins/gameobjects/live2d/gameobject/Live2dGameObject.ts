import Live2dGameObjectBase from './Live2dGameObjectBase';
import Methods from './methods/Methods';
import Model from './model/Model';

class Live2dGameObject extends Live2dGameObjectBase {
    getParameters: any;
    model: any;
    setExpression: any;
    setLipSyncValue: any;
    setModel: any;
    setOrigin: any;
    setPosition: any;
    setTimeScale: any;
    timeScale: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, key?: any, config?: any) {
        super(scene);
        this.type = 'rexLive2d';

        this.model = new Model(this);

        this.setModel(key, config);
        this.setOrigin(0.5);
        this.setPosition(x, y);
        this.setTimeScale(1);
    }

    render(renderer?: any, drawingContext?: any, calcMatrix?: any, displayList?: any, displayListIndex?: any) {
        // Ensure the DrawingContext framebuffer is bound.
        // This allows you to use Filters on the external render.
        renderer.glWrapper.updateBindingsFramebuffer({
            bindings: {
                framebuffer: drawingContext.framebuffer
            }
        }, true);

        // Run the external render method.
        this.model.draw(drawingContext, calcMatrix);
    }

    preUpdate(time?: any, delta?: any) {
        delta *= this.timeScale;
        this.model.update(time, delta);
    }

    preDestroy() {
        this.model.release();
        this.model = undefined;
    }

    get expressionName() {
        return this.model._currentExpressionName;
    }

    set expressionName(expressionName) {
        this.setExpression(expressionName);
    }

    get params() {
        return this.getParameters();
    }

    get lipSyncValue() {
        return this.model._lipSyncValue;
    }

    set lipSyncValue(value) {
        this.setLipSyncValue(value);
    }

    get hitTestResult() {
        return this.model._hitTestResult;
    }

    get prevHitTestResult() {
        return this.model._prevHitTestResult;
    }

}

Object.assign(
    Live2dGameObject.prototype,
    Methods,
)

export default Live2dGameObject;