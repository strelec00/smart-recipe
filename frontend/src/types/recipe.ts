export interface Recipe {
    id: number
    title: string
    author: string
    image: string
    category: string
    tags: string[]
    cookTime: number
    rating: number
    reviews?: number
    servings?: number
    description?: string
    ingredients: string[]
    instructions: string[]
    nutrition: {
      calories?: string
      fat?: string
      carbs?: string
      protein?: string
      [key: string]: string | undefined
    }
  }
  
  