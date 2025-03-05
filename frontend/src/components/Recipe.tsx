

type Recipe = {
    id: string;
    name: string;
    description: string;
    ingredients: string;
    instructions: string;
    image: string;
    category: string;
    created_at: string;
    updated_at: string;
};


const  Recipe = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="recipe">
            <img src={recipe.image} alt={recipe.name} />
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <p>{recipe.category}</p>
        </div>
    );
}

export default Recipe;