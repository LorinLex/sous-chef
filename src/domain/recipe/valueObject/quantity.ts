export interface QuantityProps {
    value: number
}

export class Quantity {
    private constructor(private props: QuantityProps) {}

    public static create(props: QuantityProps) {
        if (props.value <= 0) throw new Error("Quantity can't be less or equal than zero!")

        return new Quantity(props)
    }

    public static rehydrate(props: QuantityProps) {
        return Quantity.create(props)
    }

    public toPrimitive() {
        return this.value
    }

    get value() {
        return this.props.value
    }
}
