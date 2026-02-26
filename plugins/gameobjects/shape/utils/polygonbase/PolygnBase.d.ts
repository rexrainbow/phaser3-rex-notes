import type {
    DashPatternConfig as StrokeDashPatternConfig,
    DashPatternType as StrokeDashPatternType,
    IStrokePathMethods,
    IStrokePathState,
} from "../strokepath/StrokePathMethods";

export default PolygnBase;

declare namespace PolygnBase {
    /**
     * Auto dash pattern configuration.
     */
    type DashPatternConfig = StrokeDashPatternConfig;

    /**
     * Dash pattern definition.
     */
    type DashPatternType = StrokeDashPatternType;
}

/**
 * Base polygon shape with shared stroke-path behavior.
 */
declare class PolygnBase extends Phaser.GameObjects.Shape {

}

interface PolygnBase extends IStrokePathMethods, IStrokePathState {
}
