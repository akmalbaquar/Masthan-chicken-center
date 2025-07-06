// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { firebaseConfig, defaultPrices, formatPrice } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

console.log("Firebase initialized in main page");

// Function to initialize prices in Firebase if they don't exist
async function initializePrices() {
    const pricesRef = ref(database, 'prices');
    try {
        const snapshot = await get(pricesRef);
        if (!snapshot.exists()) {
            console.log("No prices found in Firebase, initializing with default values");
            await set(pricesRef, defaultPrices);
        }
    } catch (error) {
        console.error("Error initializing prices:", error);
    }
}

// Update date display
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollable) * 100;
    scrollProgress.style.transform = `scaleX(${progress / 100})`;
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check



// Function to update price display
function updatePriceDisplay(prices) {
    console.log("Updating price display with:", prices);
    
    // Update each price element
    const priceElements = {
        'withSkinPrice': '/kg',
        'skinlessPrice': '/kg',
        'eggsPrice': '',
        'liveRate': '/kg'
    };

    for (const [priceKey, unit] of Object.entries(priceElements)) {
        const element = document.getElementById(priceKey);
        if (element && prices[priceKey]) {
            const formattedPrice = formatPrice(prices[priceKey], unit);
            console.log(`Updating ${priceKey} to:`, formattedPrice);
            element.textContent = formattedPrice;
        } else {
            console.warn(`Element not found or price missing for ${priceKey}`);
        }
    }
}

// Listen for price changes in Firebase with better error handling
console.log("Setting up Firebase price listener...");
const pricesRef = ref(database, 'prices');

// Add connection state tracking
let isConnected = false;
let connectionRetries = 0;
const maxRetries = 3;

function setupFirebaseListener() {
    try {
        onValue(pricesRef, (snapshot) => {
            const prices = snapshot.val();
            console.log("Received prices from Firebase:", prices);
            isConnected = true;
            connectionRetries = 0; // Reset retry counter on successful connection
            
            if (prices) {
                updatePriceDisplay(prices);
            } else {
                console.log("No prices in Firebase, using default values");
                updatePriceDisplay(defaultPrices);
            }
        }, (error) => {
            console.error("Error fetching prices:", error);
            isConnected = false;
            
            // Retry connection if under max retries
            if (connectionRetries < maxRetries) {
                connectionRetries++;
                console.log(`Retrying Firebase connection (${connectionRetries}/${maxRetries})...`);
                setTimeout(() => {
                    setupFirebaseListener();
                }, 2000 * connectionRetries); // Exponential backoff
            } else {
                console.log("Max retries reached, using default prices");
                updatePriceDisplay(defaultPrices);
            }
        });
    } catch (error) {
        console.error("Failed to setup Firebase listener:", error);
        updatePriceDisplay(defaultPrices);
    }
}

// Handle page visibility changes to manage connections
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log("Page hidden, Firebase connection may be suspended");
    } else {
        console.log("Page visible, checking Firebase connection");
        if (!isConnected && connectionRetries < maxRetries) {
            setTimeout(setupFirebaseListener, 1000);
        }
    }
});

// Handle online/offline events
window.addEventListener('online', () => {
    console.log("Network connection restored");
    if (!isConnected) {
        setupFirebaseListener();
    }
});

window.addEventListener('offline', () => {
    console.log("Network connection lost");
    isConnected = false;
});

// Initial setup
setupFirebaseListener();

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    console.log("Page loaded, initializing...");
    updateDate();
    
    // Show loading state
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(element => {
        element.textContent = 'Loading...';
    });
    
    try {
        await initializePrices();
        console.log("Firebase initialization completed");
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        // Ensure default prices are displayed even if initialization fails
        updatePriceDisplay(defaultPrices);
    }
});

// Login Modal Functionality
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');

if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = "block";
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
}

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Check credentials (replace with your actual authentication logic)
        if (username === "admin" && password === "admin123") {
            window.location.href = "admin-dashboard.html";
        } else {
            alert("Invalid username or password!");
        }
    });
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.navbar-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
} 