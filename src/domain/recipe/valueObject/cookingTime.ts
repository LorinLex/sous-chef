interface CookingTimeProps{
    prepareTime: number
    cookingTime: number
}

export class CookingTime {
    private constructor (private props: CookingTimeProps) {}

    public create(props: CookingTimeProps) {
        if (props.prepareTime < 0) throw new Error("Prepare time must be non negative!")
        if (props.cookingTime < 0) throw new Error("Cooking time must be non negative!")
        if (props.prepareTime + props.cookingTime <= 0) throw new Error("Recipe time must be greater than zero!")

        return new CookingTime(props)
    }

    public rehydrate(props: CookingTimeProps) {
        return new CookingTime(props)
    }

    get prepareTime() {
        return this.props.prepareTime
    }

    get cookingTime() {
        return this.props.cookingTime
    }

    get fullTime() {
        return this.props.prepareTime + this.props.cookingTime
    }
}