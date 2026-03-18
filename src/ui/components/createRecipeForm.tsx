import React, { useEffect, useState } from "react"
import { UUIDTypes, v4 as uuidv4 } from "uuid"

interface IngredientForm {
  id: UUIDTypes
  name: string
  quantity: number
  measure: "g" | "ml"
}

interface StepForm {
  id: UUIDTypes
  text: string
}

interface TimeForm {
  prepareTime: number
  cookingTime: number
}

export interface CreateRecipeForm {
  name: string
  ingredients: IngredientForm[]
  steps: StepForm[]
  time: TimeForm
  type: string
}

export const CreateRecipeForm: React.FC = () => {
  const [form, setForm] = useState<CreateRecipeForm>({
    name: "",
    ingredients: [
      {
        id: uuidv4(),
        name: "",
        quantity: 0,
        measure: "g",
      },
    ],
    steps: [
      {
        id: uuidv4(),
        text: "",
      },
    ],
    time: {
      prepareTime: 0,
      cookingTime: 0,
    },
    type: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    const { name, value } = e.currentTarget

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleIngredientBlur = (index: number) => {
    setForm((prev) => {
      const value = prev.ingredients[index]
      if (!value) return prev

      if (
        prev.ingredients.length > 1 &&
        value.measure === "g" &&
        value.name === "" &&
        !value.quantity
      )
        return {
          ...prev,
          ingredients: prev.ingredients.filter((_, i) => i !== index),
        }

      if (
        index === prev.ingredients.length - 1 &&
        (value.measure !== "g" || value.name !== "" || value.quantity !== 0)
      )
        return {
          ...prev,
          ingredients: [
            ...prev.ingredients,
            {
              id: uuidv4(),
              name: "",
              quantity: 0,
              measure: "g",
            },
          ],
        }

      return prev
    })
  }

  const handleIngredientChange = (
    index: number,
    field: keyof IngredientForm,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) =>
        i === index
          ? { ...item, [field]: value === undefined ? 0 : value }
          : item,
      ),
    }))
  }

  const handleIngredientDelete = (index: number) =>
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))

  const handleStepsChange = (
    index: number,
    field: keyof StepForm,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const handleStepsBlur = (index: number) => {
    setForm((prev) => {
      const value = prev.steps[index]
      if (!value) return prev

      if (prev.steps.length > 1 && value.text === "")
        return {
          ...prev,
          steps: prev.steps.filter((_, i) => i !== index),
        }

      if (index === prev.steps.length - 1 && value.text !== "")
        return {
          ...prev,
          steps: [
            ...prev.steps,
            {
              id: uuidv4(),
              text: "",
            },
          ],
        }
      return prev
    })
  }

  const handleStepDelete = (index: number) =>
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }))

  const handleTime = (field: keyof TimeForm, value: string) => {
    setForm({
      ...form,
      time: {
        ...form.time,
        [field]: value,
      },
    })
  }

  return (
    <div>
      <form name="testForm">
        <input
          type="text"
          placeholder="Название"
          name="name"
          onChange={handleChange}
        />
        <div>
          <div>Время подготовки</div>
          <input
            name="prepareTime"
            type="text"
            maxLength={3}
            onChange={(e) => {
              e.preventDefault()
              handleTime(
                e.currentTarget.name as keyof TimeForm,
                e.currentTarget.value,
              )
            }}
            value={form.time.prepareTime}
          />
          <div>Время приготовления</div>
          <input
            name="cookingTime"
            type="number"
            maxLength={3}
            onChange={(e) => {
              e.preventDefault()
              handleTime(
                e.currentTarget.name as keyof TimeForm,
                e.currentTarget.value,
              )
            }}
            value={form.time.cookingTime}
          />
        </div>

        <h2>Ингредиенты</h2>
        {form.ingredients.map((ingredient, i) => (
          <div key={ingredient.id.toString()}>
            <input
              name="name"
              type="text"
              value={ingredient.name}
              placeholder="Название"
              onChange={(e) => {
                e.preventDefault()
                handleIngredientChange(
                  i,
                  e.currentTarget.name as keyof IngredientForm,
                  e.currentTarget.value,
                )
              }}
              onBlur={(e) => {
                e.preventDefault()
                handleIngredientBlur(i)
              }}
            />
            <input
              name="quantity"
              type="number"
              value={ingredient.quantity || undefined}
              onChange={(e) => {
                e.preventDefault()
                handleIngredientChange(
                  i,
                  e.currentTarget.name as keyof IngredientForm,
                  e.currentTarget.value,
                )
              }}
              onBlur={(e) => {
                e.preventDefault()
                handleIngredientBlur(i)
              }}
            />
            <select
              name="measure"
              value={ingredient.measure}
              onChange={(e) => {
                e.preventDefault()
                handleIngredientChange(
                  i,
                  e.currentTarget.name as keyof IngredientForm,
                  e.currentTarget.value,
                )
              }}
              onBlur={(e) => {
                e.preventDefault()
                handleIngredientBlur(i)
              }}
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
            {i !== 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleIngredientDelete(i)
                }}
              >
                X
              </button>
            )}
          </div>
        ))}

        <h2>Шаги</h2>
        {form.steps.map((step, i) => (
          <div key={step.id.toString()}>
            <textarea
              name="text"
              value={step.text || undefined}
              rows={3}
              placeholder="Порезать курочку..."
              onChange={(e) => {
                e.preventDefault()
                handleStepsChange(
                  i,
                  e.currentTarget.name as keyof StepForm,
                  e.currentTarget.value,
                )
              }}
              onBlur={(e) => {
                e.preventDefault()
                handleStepsBlur(i)
              }}
            />
            {i !== 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleStepDelete(i)
                }}
              >
                X
              </button>
            )}
          </div>
        ))}
        {/* <button type="submit" form="testForm">
          OK
        </button> */}
      </form>
    </div>
  )
}
