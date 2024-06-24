import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    console.log('API Response:', data);
    if (!data || !data.data || !data.data.recipe) {
      throw new Error('Invalid API response structure');
    }

    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log('Loaded Recipe:', state.recipe);
  } catch (err) {
    console.error(`${err} 💥`);
    throw err; // Re-throw the error to handle it in the controller
  }
};
