import Base from "../Base";

export default class ImageData extends Base {
    readonly type: 'image';

    setTexture(key: string, frame?: string | null): this;
    key: string;
    frame: string | null;

    readonly frameWidth: number;
    readonly frameHeight: number;

}