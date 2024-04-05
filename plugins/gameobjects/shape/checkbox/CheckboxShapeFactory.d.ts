import Checkbox from './CheckboxShape';

export default function (
    x: number, y: number,
    width: number, height: number,
    color?: number,
    config?: Checkbox.IConfig
): Checkbox;

export default function (
    x?: number, y?: number,
    width?: number, height?: number,
    config?: Checkbox.IConfig
): Checkbox;

export default function (
    config?: Checkbox.IConfig
): Checkbox;
