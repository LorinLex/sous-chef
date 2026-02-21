export interface CookingTimeProps{
    prepareTime: number
    cookingTime: number
}

export class CookingTime {
    private constructor (private props: CookingTimeProps) {}

    public static create(props: CookingTimeProps): CookingTime {
        if (props.prepareTime < 0) throw new Error("Prepare time must be non negative!")
        if (props.cookingTime < 0) throw new Error("Cooking time must be non negative!")
        if (props.prepareTime + props.cookingTime <= 0) throw new Error("Recipe time must be greater than zero!")

        return new CookingTime(props)
    }

    public static rehydrate(props: CookingTimeProps): CookingTime {
        return CookingTime.create(props)
    }

    public toPrimitive(): {
        prepareTime: number
        cookingTime: number
    } {
        return {
            prepareTime: this.prepareTime,
            cookingTime: this.cookingTime
        }
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