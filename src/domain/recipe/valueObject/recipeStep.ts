interface RecipeStepProps {
    order: number
    description: string
}

export class RecipeStep {
    private constructor (private props: RecipeStepProps) {}

    public static create(props: RecipeStepProps): RecipeStep {
        if (props.order < 1) throw new Error("Invalid step order");
        if (!props.description.trim()) throw new Error("Description required");

        return new RecipeStep(props)
    }

    get order() {
        return this.props.order
    }

    get description() {
        return this.props.description
    }

}