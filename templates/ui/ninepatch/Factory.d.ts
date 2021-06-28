import NinePatch from "./NinePatch";

declare type NinePatchFactory = (
    x?: number, y?: number,
    width?: number, height?: number,

    key?: string, baseFrame?: string,
    getFrameNameCallback?: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined),

    columns?: (number | undefined)[],
    rows?: (number | undefined)[],

    preserveRatio?: boolean,
    stretchMode?: 0 | 1 | 'scale' | 'repeat' |
    {
        edge?: 0 | 1 | 'scale' | 'repeat',
        internal?: 0 | 1 | 'scale' | 'repeat',
    },
) => NinePatch;

export default NinePatchFactory;