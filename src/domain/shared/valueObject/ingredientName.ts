import { IngredientNameProps } from "./types"

export class IngredientName {
    private constructor(private props: IngredientNameProps) {}
    
    public static create(props: IngredientNameProps) {
        if (!props.value.trim()) throw new Error("Ingredient name must be not empty!")
        
        return new IngredientName(props)
    }

    public static rehydrate(props: IngredientNameProps) {
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
