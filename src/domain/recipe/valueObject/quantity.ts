interface QuantityProps {
    value: number
}

export class Quantity {
    private constructor(private props: QuantityProps) {}

    public static create(props: QuantityProps) {
        if (props.value <= 0) throw new Error("Quantity can't be less or equal than zero!")

        return new Quantity(props)
    }

    public static rehydrate(props: QuantityProps) {
        return new Quantity(props)
    }

    get value() {
        return this.props.value
    }
}
