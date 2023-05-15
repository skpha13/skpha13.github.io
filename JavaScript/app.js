const form = document.querySelector('form');

if(localStorage.getItem('name') != null) {
    form.name.value = localStorage.getItem('name');
}

if(localStorage.getItem('email') != null) {
    form.email.value = localStorage.getItem('email');
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    localStorage.setItem('name', form.name.value);
    localStorage.setItem('email', form.email.value);

    const formData = new FormData(form);

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.log(error))
});

