import { ReadRecipeDTO } from "application/recipe/dto/readRecipeDTO"

export interface ReadRecipeProps {
  data: ReadRecipeDTO
}

export const ReadRecipe: React.FC<ReadRecipeProps> = ({ data }) => {
  // return <div>{JSON.stringify(data, (key, value) => value, 4)}</div>
  return (
    <div>
      <p>name: {data.name}</p>
      <p>type: {data.recipeType}</p>
      <p>cook time: {data.time.cookingTime}</p>
      <p>prepare time: {data.time.prepareTime}</p>
      <div>
        ingredients:
        <br />
        {data.ingredients.map((value) => (
          <div>
            <span>{value.name}</span> - <span>{value.quantity}</span>
            <span>{value.isLiquid ? "ml" : "g"}</span>
            <br />
          </div>
        ))}
        <br />
      </div>
      <div>
        steps:
        <br />
        {data.steps.map((value) => (
          <div>
            <span>{value.text}</span>
            <br />
          </div>
        ))}
        <br />
      </div>
    </div>
  )
}
