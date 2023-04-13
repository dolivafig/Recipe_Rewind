const add = async (event) => {

    event.preventDefault();

    document.location.replace('/addrecipe');
}

document.querySelector('.create-account-form').addEventListener('submit', add);

