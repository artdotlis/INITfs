enum ErrType {
    default = 'UndefinedError',
}

class KnownError extends Error {
    private readonly typeV: ErrType;

    constructor(message: string, type?: ErrType) {
        super(message);
        this.typeV = type ?? ErrType.default;
    }

    public get type(): ErrType {
        return this.typeV;
    }

    public get customMsg(): string {
        return this.message;
    }
}

export default KnownError;
export { ErrType };
