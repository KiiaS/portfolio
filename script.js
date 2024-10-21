//Toggle menu functionality for the hamburger menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  //Event listener for contact form
  document.addEventListener("DOMContentLoaded", function(){
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation flags
        let isValid = true;

        // Name validation
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
    }else {
      document.getElementById('nameError').style.display = 'none';
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '' || !emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Valid email is required';
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
  } else {
      document.getElementById('emailError').style.display = 'none';
  }

  // Message validation
  if (message === '') {
      document.getElementById('messageError').textContent = 'Message is required';
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
  } else {
      document.getElementById('messageError').style.display = 'none';
  }

  
  if (isValid) {
      alert('Form submitted successfully!');
      
  }
});
}
  })
  //Event listener for search button
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchButton").addEventListener("click", function() {
        const word = document.getElementById("wordInput").value;
        const definitionDiv = document.getElementById("definition");

        // Clear previous definitions
        definitionDiv.innerHTML = "";

        if (!word) {
            definitionDiv.innerHTML = "<p>Please enter a word.</p>";
            return;
        }

        console.log(`Fetching definition for: ${word}`); // Log the word being searched

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                console.log(`Response status: ${response.status}`); // Log response status
                if (!response.ok) {
                    throw new Error('Word not found');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the entire response data for inspection
                const definitions = data[0].meanings[0].definitions;
                definitionDiv.innerHTML = "<h2>Definitions:</h2>";
                definitions.forEach(def => {
                    definitionDiv.innerHTML += `<p><strong>Definition:</strong> ${def.definition}</p>`;
                    if (def.example) {
                        definitionDiv.innerHTML += `<p><strong>Example:</strong> ${def.example}</p>`;
                    }
                });
                //Set timer
                setTimeout(function(){
                  alert('You succesfully found the definition of the word');
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error); // Log error for better debugging
                definitionDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    });
});
