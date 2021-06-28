import RoundRectangle from './RoundRectangle';

declare type RoundRectangleFactory = (
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig?: number |
    { x?: number, y?: number } |
    {
        tl?: number | { x?: number, y?: number },
        tr?: number | { x?: number, y?: number },
        bl?: number | { x?: number, y?: number },
        br?: number | { x?: number, y?: number }
    } |
    {
        radius?: number |
        { x?: number, y?: number } |
        {
            tl?: number | { x?: number, y?: number },
            tr?: number | { x?: number, y?: number },
            bl?: number | { x?: number, y?: number },
            br?: number | { x?: number, y?: number }
        },
        iteration?: number
    },
    fillColor?: number,
    fillAlpha?: number

) => RoundRectangle;

export default RoundRectangleFactory;