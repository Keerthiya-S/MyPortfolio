document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('imageContainer');
    const imageWidth = container.firstElementChild.clientWidth;
    
    function shiftImages() {
        // Clone the first image and append it to the end
        const firstImage = container.firstElementChild;
        const clone = firstImage.cloneNode(true);
        container.appendChild(clone);

        // Apply transform to slide images
        container.style.transition = 'transform 0.5s ease-in-out';
        container.style.transform = `translateX(-${imageWidth}px)`;

        // Remove the original first image after transition
        setTimeout(() => {
            container.style.transition = 'none';
            container.style.transform = 'none';
            container.removeChild(firstImage);
        }, 500); // Duration should match the CSS transition duration
    }

    setInterval(shiftImages, 8000); // Shift every 8 seconds
});



