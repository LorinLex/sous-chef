import { UUIDTypes, v4 as uuidv4, validate } from 'uuid';

interface RecipeIdProps {
    value: UUIDTypes
}

export class RecipeId {
    private constructor(private props: RecipeIdProps) {}

    public static generate(): RecipeId {
        return new RecipeId({ value: uuidv4() })
    }

    public static rehydrate({ value }: { value: string }): RecipeId {
        if (!validate(value)) throw new Error("Invalid recipe id");

        return new RecipeId({ value });
    }

    public toString(): string {
        return this.props.value.toString();
    }

    public equals(other: RecipeId): boolean {
        return this.toString() === other.toString();
    }
}