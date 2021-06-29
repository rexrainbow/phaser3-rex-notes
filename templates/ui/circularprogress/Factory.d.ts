import CircularProgress from './CircularProgress';

declare type CircularProgressFactory = (
    config?: {
        x?: number, y?: number,
        radius?: number,

        color?: string | number,
        trackColor?: string | number,
        centerColor?: string | number,
        thickness?: number,
        startAngle?: number,
        anticlockwise?: boolean,

        value?: number,
    }
) => CircularProgress;

export default CircularProgressFactory;