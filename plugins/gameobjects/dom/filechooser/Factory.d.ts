import FileChooser from './FileChooser';

export default function (
    x: number, y: number,
    width: number, height: number,
    config?: FileChooser.IConfig
): FileChooser;

export default function (
    x: number, y: number,
    config?: FileChooser.IConfig
): FileChooser;

export default function (
    config?: FileChooser.IConfig
): FileChooser;
