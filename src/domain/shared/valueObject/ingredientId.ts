import { UUIDTypes, v4 as uuidv4, validate } from 'uuid';

interface IngredientIdProps {
    value: UUIDTypes
}

export class IngredientId {
    private constructor(private props: IngredientIdProps) {}

    public static generate(): IngredientId {
        return new IngredientId({ value: uuidv4() })
    }

    public static rehydrate({ value }: { value: string }): IngredientId {
        if (!validate(value)) throw new Error("Invalid ingredient id");

        return new IngredientId({ value });
    }

    public toString(): string {
        return this.props.value.toString();
    }

    public equals(other: IngredientId): boolean {
        return this.toString() === other.toString();
    }
}