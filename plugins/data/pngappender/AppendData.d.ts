export default AppendData;

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
 * Structured data value that can be appended to a PNG buffer.
 */
type DataType = BasicDataType | DictDataType | ListDateType;

/**
 * Append custom data into a PNG binary buffer.
 *
 * @param pngBuffer - Source PNG buffer to append data to.
 * @param data - Data payload to append.
 * @returns PNG buffer containing appended data.
 */
declare function AppendData(
    pngBuffer: Uint8Array,
    data: DataType | Uint8Array
): Uint8Array;
