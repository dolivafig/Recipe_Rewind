var api_key = "xlozztFokJwpqfVlSdbxiEsnNSdEQwdTvLg0rjDvPh6lR95dFqOKpQpC";
var image = document.querySelector('#image-api');

const add = async (event) => {

    event.preventDefault();

    document.location.replace('/addrecipe');
}

document.querySelector('.create-account-form').addEventListener('submit', add);

async function CuratedPhotos() {
    // fetch the data from api
    const data = await fetch(`https://api.pexels.com/v1/search?query=food&total_results=1`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: api_key,     //use the apikey you have generated
            },
        });
    const response = await data.json();   //convert the response to json
    // console.log(response);
    // console.log(response.photos[0].url);

    photos = response.photos[0].src.medium;
    image.setAttribute("src", photos);
}

// CuratedPhotos();

const deleteRecipe = async (event) => {
    event.preventDefault();
    console.log('deleting test')
    const recipeId = event.target.dataset.id;
    try {
        const response = await fetch(`/api/users/recipes/${recipeId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/');
            alert('Successfully deleted recipe!');
        } else {
            alert('Failed to delete recipe.');
        }
    } catch (err) {
        alert('Failed to delete recipe!');
        console.log(err);
    }
};

const deleteButtons = document.querySelectorAll('.delete');
console.log(deleteButtons);
for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', deleteRecipe);
}