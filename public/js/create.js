const createAccountHandler = async (event) => {

    event.preventDefault();
  
    const name = document.querySelector('#name-create').value.trim();
    const email = document.querySelector('#email-create').value.trim();
    const password = document.querySelector('#password-create').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          name,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        alert('User created successfully!');
      } else {
        alert('Failed to create user.');
      }
    }
};
  
  document.querySelector('.create-form').addEventListener('submit', createAccountHandler);