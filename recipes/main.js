import recipes from './recipes.mjs';
function random(num) {
    return Math.floor(Math.random() * num);
}
function getRandomRecipe() {
    const randomIndex = random(recipes.length);
    return recipes[randomIndex];
}
function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
}
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}
function recipeTemplate(recipe) {
    return `
    <figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}" />
        <figcaption>
            <ul class="recipe__tags">
                ${tagsTemplate(recipe.tags)}
            </ul>
            <h2>${recipe.name}</h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </figcaption>
    </figure>`;
}
function renderRecipes(recipeList) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}
function init() {
    const randomRecipe = getRandomRecipe();
    renderRecipes([randomRecipe]);
}
init();
function filterRecipes(query) {
    query = query.toLowerCase();
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
            recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
        );
    }).sort((a, b) => a.name.localeCompare(b.name));
}
function searchHandler(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-form input').value;
    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}
document.querySelector('.search-form button').addEventListener('click', searchHandler);