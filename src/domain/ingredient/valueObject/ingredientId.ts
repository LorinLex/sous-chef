import { UUIDTypes, v4 as uuidv4, validate } from 'uuid';

interface IngredientIdProps {
    value: UUIDTypes
}

export class IngredientId {
    private constructor(private props: IngredientIdProps) {}

    public static create({ value }: { value?: string } = {}): IngredientId {
        if (value && !validate(value))
              throw new Error("Invalid IngredientId");

        return new IngredientId({ value : value ?? uuidv4() });
    }

    public toString(): string {
        return this.props.value.toString();
    }

    public equals(other: IngredientId): boolean {
        return this.toString() === other.toString();
    }
}