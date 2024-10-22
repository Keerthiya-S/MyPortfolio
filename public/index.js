document.addEventListener("DOMContentLoaded", function() {
    const hiddenElements = document.querySelectorAll('.hidden-content');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it becomes visible
            }
        });
    }, { threshold: 0.1 }); // 10% of the element needs to be visible

    hiddenElements.forEach(element => {
        observer.observe(element);
    });
});
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Collect form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    console.log(formData); // Check if form data is being collected properly

    try {
      // Send POST request to the backend
      const response = await fetch('/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      console.log(data);  // Handle the response from the server
      const responseMessageElement = document.getElementById('responseMessage');
      responseMessageElement.textContent = 'Form submitted successfully!';
      // alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);  // Handle any errors
      alert('There was an error submitting the form.');
    }
  });
});
