export function parseStringEnum<
    T extends Record<string, string>
>(
    enumObj: T,
    value: string
): T[keyof T] {
    if (!Object.values(enumObj).includes(value)) {
        throw new Error(`Invalid enum value: ${value}`);
    }

    return value as T[keyof T];
}
