import ExpandGridSizer from './ExpandGridSizer';


export default function (
    config?: ExpandGridSizer.IConfig
): ExpandGridSizer;

export default function (
    x: number, y: number,
    config?: ExpandGridSizer.IConfig
): ExpandGridSizer;

export default function (
    x: number, y: number,
    width: number, height: number,
    config?: ExpandGridSizer.IConfig
): ExpandGridSizer;

export default function (
    x: number, y: number,
    width: number, height: number,
    column: number, row: number,
    config?: ExpandGridSizer.IConfig
): ExpandGridSizer;