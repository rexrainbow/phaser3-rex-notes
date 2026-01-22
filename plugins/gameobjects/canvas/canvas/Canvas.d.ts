import CanvasBase from '../canvasbase/Canvas';

/**
 * Canvas game object with image loading helpers.
 */
export default class Canvas extends CanvasBase {
    /**
     * Load an image from a URL.
     * @param url - Image URL.
     * @param callback - Callback fired on load.
     * @returns This instance.
     */
    loadFromURL(
        url: string,
        callback?: () => void
    ): this;

    /**
     * Load an image from a URL and return a promise.
     * @param url - Image URL.
     * @returns A promise that resolves when loaded.
     */
    loadFromURLPromise(
        url: string
    ): Promise<any>;

    /**
     * Load an image from a File object.
     * @param file - File object.
     * @param callback - Callback fired on load.
     * @returns This instance.
     */
    loadFromFile(
        file: File,
        callback?: () => void
    ): this;

    /**
     * Load an image from a File object and return a promise.
     * @param file - File object.
     * @returns A promise that resolves when loaded.
     */
    loadFromFilePromise(
        file: File
    ): Promise<any>;

}
