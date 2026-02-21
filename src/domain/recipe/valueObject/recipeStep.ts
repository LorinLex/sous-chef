export interface RecipeStepProps {
    order: number
    text: string
}

export class RecipeStep {
    private constructor (private props: RecipeStepProps) {}

    public static create(props: RecipeStepProps): RecipeStep {
        if (props.order < 1) throw new Error("Invalid step order");
        if (!props.text.trim()) throw new Error("Description required");

        return new RecipeStep(props)
    }

    public rehydrate(props: RecipeStepProps) {
        return RecipeStep.create(props)
    }

    public toPrimitive() {
        return {
            order: this.order,
            text: this.text
        }
    }

    get order() {
        return this.props.order
    }

    get text() {
        return this.props.text
    }

}