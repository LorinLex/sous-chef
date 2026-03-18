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

  const handleIngredient = (
    index: number,
    field: keyof IngredientForm,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  const handleSteps = (index: number, field: keyof StepForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

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
              placeholder="название"
              onChange={(e) =>
                handleIngredient(
                  i,
                  e.currentTarget.name as keyof IngredientForm,
                  e.currentTarget.value,
                )
              }
            />
            <input
              name="quantity"
              type="number"
              value={ingredient.quantity}
              onChange={(e) => {
                e.preventDefault()
                handleIngredient(
                  i,
                  e.currentTarget.name as keyof IngredientForm,
                  e.currentTarget.value,
                )
              }}
            />
            <select
              name="measure"
              value={ingredient.measure}
              onChange={(e) => {
                e.preventDefault()
                handleIngredient(
                  i,
                  e.currentTarget.name as keyof IngredientForm,
                  e.currentTarget.value,
                )
              }}
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
          </div>
        ))}

        <h2>Шаги</h2>
        {form.steps.map((step, i) => (
          <div key={step.id.toString()}>
            <textarea
              name="text"
              onChange={(e) => {
                e.preventDefault()
                handleSteps(
                  i,
                  e.currentTarget.name as keyof StepForm,
                  e.currentTarget.value,
                )
              }}
              value={step.text || undefined}
              rows={3}
              placeholder="Порезать курочку..."
            />
          </div>
        ))}
        {/* <button type="submit" form="testForm">
          OK
        </button> */}
      </form>
    </div>
  )
}
