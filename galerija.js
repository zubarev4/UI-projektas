
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('#images img');

// Function to open the lightbox
function openLightbox(event) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.flexDirection = 'column';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = event.target.src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '80%';
    img.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';

    const caption = document.createElement('p');
    caption.textContent = event.target.alt;
    caption.style.color = 'white';
    caption.style.marginTop = '10px';
    caption.style.fontSize = '1.2rem';
    caption.style.textAlign = 'center';

    lightbox.appendChild(img);
    lightbox.appendChild(caption);
    document.body.appendChild(lightbox);

    // Add navigation buttons
    const prevButton = document.createElement('div');
    prevButton.id = 'prevButton';
    prevButton.innerHTML = '&#8249;';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '20px';
    prevButton.style.top = '50%';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.fontSize = '3rem';
    prevButton.style.color = 'white';
    prevButton.style.cursor = 'pointer';
    lightbox.appendChild(prevButton);

    const nextButton = document.createElement('div');
    nextButton.id = 'nextButton';
    nextButton.innerHTML = '&#8250;';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '20px';
    nextButton.style.top = '50%';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.fontSize = '3rem';
    nextButton.style.color = 'white';
    nextButton.style.cursor = 'pointer';
    lightbox.appendChild(nextButton);

    // Close the lightbox on click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === img) {
            document.body.removeChild(lightbox);
            allowScrolling();
        }
    });

    // Navigate to the previous image
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        img.src = galleryImages[currentImageIndex].src;
        caption.textContent = galleryImages[currentImageIndex].alt;
    });

    // Navigate to the next image
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        img.src = galleryImages[currentImageIndex].src;
        caption.textContent = galleryImages[currentImageIndex].alt;
    });
}

// Attach event listeners to each image in the gallery
galleryImages.forEach((image, index) => {
    image.addEventListener('click', openLightbox);
    image.style.cursor = 'url(cursor-image.png), pointer'; // Change cursor to custom image when hovering over
    image.dataset.index = index;
});

// Prevent scrolling while the lightbox is open
function preventScrolling() {
    document.body.style.overflow = 'hidden';
}

function allowScrolling() {
    document.body.style.overflow = '';
}

// Modify event listeners for scroll behavior
galleryImages.forEach((img) => {
    img.addEventListener('click', (event) => {
        preventScrolling();
        currentImageIndex = parseInt(event.target.dataset.index, 10);
    });

    document.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            allowScrolling();
        }
    });
});