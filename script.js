// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
});

// Add animation to project cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Player Count Functionality
async function updatePlayerCount() {
    const countElement = document.querySelector('.count-number');
    if (!countElement) return;

    try {
        // Using a proxy service to avoid CORS issues
        const response = await fetch(`https://api.mcsrvstat.us/2/play.themegahive.com`);
        const data = await response.json();
        
        if (data.online) {
            countElement.textContent = data.players.online;
            countElement.style.color = '#FFD700'; // Gold color for online status
        } else {
            countElement.textContent = 'Offline';
            countElement.style.color = '#FF4444'; // Red color for offline status
        }
    } catch (error) {
        console.error('Error fetching player count:', error);
        countElement.textContent = 'Error';
        countElement.style.color = '#FF4444';
    }
}

// Update player count every 30 seconds
updatePlayerCount();
setInterval(updatePlayerCount, 30000); 