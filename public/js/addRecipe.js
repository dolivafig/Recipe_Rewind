const addRecipe = async (event) => {

  event.preventDefault();

    const recipeName = document.querySelector('#recipeName').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();
    const method = document.querySelector('#method').value.trim();
    const category = document.querySelector('#category').value;
  
    if (recipeName && ingredients && method && category) {
try {
  console.log('posting test')
      const response = await fetch('/api/users/addrecipe', {
        method: 'POST',
        body: JSON.stringify({recipeName, ingredients, method, category}),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        document.location.replace('/');
        alert('Succesfully added recipe!');
      } else {
        alert('Failed to add recipe.');
      }
    }catch(err){
      alert('Failed to add recipe.');
        console.log(err);
    }}
};
  
  document.querySelector('.create-account-form').addEventListener('submit', addRecipe);

  // const deleteRecipe = async (event) => {
  //   event.preventDefault();
  //   console.log('deleting test')
  //   const recipeId = event.target.dataset.id;
  //   try {
  //     const response = await fetch(`/api/users/recipes/${recipeId}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       document.location.replace('/');
  //       alert('Successfully deleted recipe!');
  //     } else {
  //       alert('Failed to delete recipe.');
  //     }
  //   } catch (err) {
  //     alert('Failed to delete recipe!');
  //     console.log(err);
  //   }
  // };
  
  // const deleteButtons = document.querySelectorAll('.delete');
  // console.log(deleteButtons);
  // for (const deleteButton of deleteButtons) {
  //   deleteButton.addEventListener('click', deleteRecipe);
  // }
  