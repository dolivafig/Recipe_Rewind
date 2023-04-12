const addRecipe = async (event) => {

  event.preventDefault();

    const recipeName = document.querySelector('#recipeName').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();
    const method = document.querySelector('#method').value.trim();
    const category = document.querySelector('#category').value;
  
    if (recipeName && ingredients && method && category) {
try {
      const response = await fetch('/api/users/addrecipe', {
        method: 'POST',
        body: JSON.stringify({recipeName, ingredients, method, category}),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add recipe.');
      }
    }catch(err){
      alert('Failed to add recipe.');
        console.log(err);
    }}
};
  
  document.querySelector('.create-account-form').addEventListener('submit', addRecipe);