import { UUIDTypes, v4 as uuidv4, validate } from 'uuid';

interface RecipeIdProps {
    value: UUIDTypes
}

export class RecipeId {
    private constructor(private props: RecipeIdProps) {}

    public static create({ value }: { value?: string } = {}): RecipeId {
        if (value && !validate(value))
              throw new Error("Invalid recipe id");

        return new RecipeId({ value : value ?? uuidv4() });
    }

    public toString(): string {
        return this.props.value.toString();
    }

    public equals(other: RecipeId): boolean {
        return this.toString() === other.toString();
    }
}