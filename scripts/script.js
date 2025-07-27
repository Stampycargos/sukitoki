document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Load Menu from JSON (only on menu.html)
    if (document.getElementById('menu-categories')) {
        fetch('scripts/menu.json')
            .then(response => response.json())
            .then(data => {
                const menuContainer = document.getElementById('menu-categories');
                menuContainer.innerHTML = ''; // Clear "Loading menu..."

                data.menu.forEach(category => {
                    const categorySection = document.createElement('div');
                    categorySection.className = 'menu-category-section';

                    const categoryTitle = document.createElement('h3');
                    categoryTitle.textContent = category.categoryName;
                    categorySection.appendChild(categoryTitle);

                    category.items.forEach(item => {
                        const menuItemDiv = document.createElement('div');
                        menuItemDiv.className = 'menu-item';

                        if (item.image) {
                            const itemImage = document.createElement('img');
                            itemImage.src = `images/${item.image}`; // Assuming images are in an 'images' folder
                            itemImage.alt = item.name;
                            menuItemDiv.appendChild(itemImage);
                        }

                        const itemDetailsDiv = document.createElement('div');
                        itemDetailsDiv.className = 'menu-item-details';

                        const itemName = document.createElement('h4');
                        itemName.textContent = item.name;
                        itemDetailsDiv.appendChild(itemName);

                        const itemDescription = document.createElement('p');
                        itemDescription.textContent = item.description;
                        itemDetailsDiv.appendChild(itemDescription);

                        const itemPrice = document.createElement('span');
                        itemPrice.className = 'price';
                        itemPrice.textContent = `$${item.price.toFixed(2)}`;
                        itemDetailsDiv.appendChild(itemPrice);

                        menuItemDiv.appendChild(itemDetailsDiv);
                        categorySection.appendChild(menuItemDiv);
                    });

                    menuContainer.appendChild(categorySection);
                });
            })
            .catch(error => {
                console.error('Error fetching the menu:', error);
                const menuContainer = document.getElementById('menu-categories');
                menuContainer.innerHTML = '<p>Failed to load menu. Please try again later.</p>';
            });
    }

    // Handle Contact Form Submission (Example - client-side validation/message)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Basic client-side validation (can be more robust)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            // In a real application, you would send this data to a server
            // using fetch() or XMLHttpRequest.
            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset(); // Clear the form
        });
    }
});