export default function <P extends string>(
    prop: P,
    obj: unknown
): obj is Record<P, unknown> {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    return prop in obj;
}
