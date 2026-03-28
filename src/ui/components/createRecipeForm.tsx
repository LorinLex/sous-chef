import React, { SubmitEventHandler, useEffect, useState } from "react"
import { UUIDTypes, v4 as uuidv4 } from "uuid"

export interface IngredientForm {
  id: UUIDTypes
  name: string
  quantity: string
  measure: "g" | "ml"
}

export interface StepForm {
  id: UUIDTypes
  text: string
}

interface TimeForm {
  prepareTime: number
  cookingTime: number
}

export interface CreateRecipeFormState {
  name: string
  ingredients: IngredientForm[]
  steps: StepForm[]
  time: TimeForm
  type?: string
}

export interface CreateRecipeFormProps {
  onSubmit: ({ data }: { data: CreateRecipeFormState }) => void
}

export const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({
  onSubmit,
}) => {
  const [form, setForm] = useState<CreateRecipeFormState>({
    name: "",
    ingredients: [
      {
        id: uuidv4(),
        name: "",
        quantity: "",
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

  const handleIngredientKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    console.log("KEY")
    if (e.key === "Backspace") {
      console.log("BACKSPACE")
      setForm((prev) => {
        const value = prev.ingredients[index]
        if (!value) return prev

        if (
          prev.ingredients.length > 1 &&
          value.name === "" &&
          value.quantity === ""
        ) {
          e.preventDefault()
          return {
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
          }
        }

        return prev
      })
    } else if (e.key === "Enter") {
      e.preventDefault()
      // реализация перевода фокуса на новую строку
      // сделать при разбитии на компоненты
      // setForm((prev) => {
      //   // const inputName = e.currentTarget.name as keyof IngredientForm
      //   const ingredient = prev.ingredients[index]
      //   if (!ingredient) return prev
      //   console.log(index, prev.ingredients.length)
      //   if (
      //     index === prev.ingredients.length - 2 &&
      //     (prev.ingredients[index]?.name !== "" ||
      //       prev.ingredients[index]?.quantity !== "")
      //   ) {
      //     return {
      //       ...prev,
      //       ingredients: [
      //         ...prev.ingredients,
      //         {
      //           id: uuidv4(),
      //           name: "",
      //           quantity: "",
      //           measure: "g",
      //         },
      //       ],
      //     }
      //   }
      //   return prev
      // })
    }
  }

  const handleIngredientChange = (
    index: number,
    field: keyof IngredientForm,
    value: string,
  ) => {
    setForm((prev) => {
      const next = {
        ...prev,
        ingredients: prev.ingredients.map((item, i) =>
          i === index
            ? { ...item, [field]: value === undefined ? "" : value }
            : item,
        ),
      }

      if (
        index === next.ingredients.length - 1 &&
        (next.ingredients[index]?.name !== "" ||
          next.ingredients[index]?.quantity !== "")
      ) {
        next.ingredients.push({
          id: uuidv4(),
          name: "",
          quantity: "",
          measure: "g",
        })
      }
      return next
    })
  }

  const handleIngredientDelete = (index: number) => {
    console.log("DELETE")
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const handleStepsChange = (
    index: number,
    field: keyof StepForm,
    value: string,
  ) => {
    setForm((prev) => {
      const next = {
        ...prev,
        steps: prev.steps.map((item, i) =>
          i === index ? { ...item, [field]: value } : item,
        ),
      }

      if (index === next.steps.length - 1 && next.steps[index]?.text !== "")
        next.steps.push({
          id: uuidv4(),
          text: "",
        })

      return next
    })
  }

  const handleStepsKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    console.log(e.key)
    if (e.key !== "Backspace") return
    setForm((prev) => {
      const value = prev.steps[index]
      if (!value) return prev

      if (prev.steps.length > 1 && value.text === "") {
        e.preventDefault()
        return {
          ...prev,
          steps: prev.steps.filter((_, i) => i !== index),
        }
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

  const onFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(form)
    onSubmit({
      data: {
        ...form,
        ingredients: form.ingredients.splice(0, form.ingredients.length - 1),
        steps: form.steps.splice(0, form.steps.length - 1),
      },
    })
  }

  return (
    <div style={{ padding: "var(--file-margins)" }}>
      <div
        style={{
          maxWidth: "var(--file-line-width)",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <form name="testForm" onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="Название"
            name="name"
            required
            onChange={handleChange}
          />
          <div>
            <div>Время подготовки</div>
            <input
              name="prepareTime"
              type="number"
              maxLength={3}
              required
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
              required
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
                onKeyDown={(e) => {
                  handleIngredientKeyDown(e, i)
                }}
              />
              <input
                name="quantity"
                type="number"
                placeholder="Количество"
                value={ingredient.quantity}
                onChange={(e) => {
                  e.preventDefault()
                  handleIngredientChange(
                    i,
                    e.currentTarget.name as keyof IngredientForm,
                    e.currentTarget.value,
                  )
                }}
                onKeyDown={(e) => {
                  handleIngredientKeyDown(e, i)
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
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
              </select>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleIngredientDelete(i)
                }}
                disabled={i === form.ingredients.length - 1}
              >
                X
              </button>
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
                onKeyDown={(e) => {
                  handleStepsKeyDown(e, i)
                }}
              />
              <button
                disabled={i === form.steps.length - 1}
                onClick={(e) => {
                  e.preventDefault()
                  handleStepDelete(i)
                }}
              >
                X
              </button>
            </div>
          ))}
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  )
}
