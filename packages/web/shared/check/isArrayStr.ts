export default function (arr2Test: unknown[]): boolean {
    for (const ele of arr2Test) {
        if (typeof ele !== 'string') {
            return false;
        }
    }
    return true;
}
