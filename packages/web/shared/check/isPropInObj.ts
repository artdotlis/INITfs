type checker = (obj: unknown) => boolean;

export default function (obj2Test: object, propList: [string, checker][]): boolean {
    for (const [, typeCheck] of propList) {
        if (!typeCheck(obj2Test)) {
            return false;
        }
    }
    return true;
}
