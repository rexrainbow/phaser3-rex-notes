export default AppendData;

declare function AppendData(
    pngBuffer: Uint8Array,
    data: { [key: string]: any }
): Uint8Array;