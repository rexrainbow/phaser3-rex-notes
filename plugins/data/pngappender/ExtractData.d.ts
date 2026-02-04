export default ExtractData;

/**
 * Primitive value supported by the PNG appender data payload.
 */
type BasicDataType = number | string;
/**
 * Object-like recursive value supported by the PNG appender data payload.
 */
type DictDataType = { [key: string]: BasicDataType } | { [key: string]: DictDataType } | { [key: string]: ListDateType };
/**
 * Array-like recursive value supported by the PNG appender data payload.
 */
type ListDateType = (BasicDataType | ListDateType | DictDataType)[];
/**
 * Structured data value extracted from a PNG buffer.
 */
type DataType = BasicDataType | DictDataType | ListDateType;

/**
 * Extract appended data from a PNG binary buffer.
 *
 * @param pngBuffer - PNG buffer that may contain appended data.
 * @returns Extracted structured data or raw binary payload.
 */
declare function ExtractData(
    pngBuffer: Uint8Array
): DataType | Uint8Array;
