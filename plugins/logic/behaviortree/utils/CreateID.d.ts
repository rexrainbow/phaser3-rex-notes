/**
 * Set the current serial number.
 *
 * @param value - The serial number value.
 */
export function SetSerialNumber(value?: number | null): void;
/**
 * Set the serial number prefix.
 *
 * @param prefix - The prefix string.
 */
export function SetSerialNumberPrefix(prefix: string): void;
/**
 * Get the current serial number.
 *
 * @returns The current serial number or null.
 */
export function GetSerialNumber(): number | null;
/**
 * Create a new unique id.
 *
 * @returns The generated id string.
 */
export function CreateID(): string;
