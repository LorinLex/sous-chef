export class IngredientName {
    private constructor(private props: { value: string }) {}
    
    public static create(props: { value: string }) {
        if (!props.value.trim()) throw new Error("Ingredient name must be not empty!")
        
        return new IngredientName(props)
    }

    public static rehydrate(props: { value: string }) {
        return IngredientName.create(props)
    }

    public toPrimitive() {
        return this.value
    }
    
    get value() { return this.props.value }
    
    get canonical() {
        return this.value.trim().toLowerCase().replace(" ", "_")
    }
}
