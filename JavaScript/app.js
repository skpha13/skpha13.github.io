fetch('http://localhost:3000/contact')
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.log(error))