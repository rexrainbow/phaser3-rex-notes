import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default RoundRectangleProgress;

declare namespace RoundRectangleProgress {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: RoundRectangleProgress
    ) => void;

    type CornerRadiusType = {
        x: number,
        y: number,
        convex: boolean
    };

    interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number }),

        x?: number,
        y?: number,
    }

    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,
        radius?: number | IRadiusConfig |
        ({
            radius?: (number | IRadiusConfig),
            iteration?: number
        }),

        trackColor?: string | number,
        trackStrokeThickness?: number,
        trackStrokeColor?: string | number,
        barColor?: string | number,

        rtl?: boolean,
        orientation?: OrientationTypes,

        value?: number,

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback: ValueChangeCallbackType,
    }

    namespace Events {
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            circularProgress: RoundRectangleProgress
        ) => void;
    }
}

declare class RoundRectangleProgress extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: RoundRectangleProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        radiusConfig?: number | RoundRectangleProgress.IRadiusConfig |
            ({
                radius?: (number | RoundRectangleProgress.IRadiusConfig),
                iteration?: number
            }),
        config?: RoundRectangleProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        radiusConfig?: number | RoundRectangleProgress.IRadiusConfig |
            ({
                radius?: (number | RoundRectangleProgress.IRadiusConfig),
                iteration?: number
            }),
        barColor?: string | number,
        value?: number,
        config?: RoundRectangleProgress.IConfig
    );

    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;
    value: number;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    setTrackColor(color?: number): this;
    trackColor: number;

    setTrackStroke(
        lineWidth?: number,
        color?: number
    ): this;
    trackStrokeThickness: number;
    trackStrokeColor: number;

    setBarColor(color?: number): this;
    barColor: number;

    setRTL(enable?: boolean): this;
    rtl: boolean;

    setOrientation(orientation: RoundRectangleProgress.OrientationTypes): this;
    orientation: number;

    setIteration(iteration: number): this;
    iteration: number;

    setRadius(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;
    radius: number;

    setRadiusTL(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;
    radiusTL: number;

    setRadiusTR(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;
    radiusTR: number;

    setRadiusBL(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;
    radiusBL: number;

    setRadiusBR(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;
    radiusBR: number;

    readonly cornerRadius: {
        tl: RoundRectangleProgress.CornerRadiusType,
        tr: RoundRectangleProgress.CornerRadiusType,
        bl: RoundRectangleProgress.CornerRadiusType,
        br: RoundRectangleProgress.CornerRadiusType,
    };
}