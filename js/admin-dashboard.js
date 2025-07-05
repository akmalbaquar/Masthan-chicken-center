// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { firebaseConfig, defaultPrices, formatPrice } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

console.log("Firebase initialized in admin dashboard");

// Price variables
let currentPrices = {
    withSkinPrice: 180,
    skinlessPrice: 220,
    eggsPrice: 579,
    liveRate: 100
};

// Load current prices from Firebase
function loadCurrentPrices() {
    console.log("Loading current prices from Firebase...");
    const pricesRef = ref(database, 'prices');
    onValue(pricesRef, (snapshot) => {
        const prices = snapshot.val() || currentPrices;
        console.log("Received prices from Firebase:", prices);
        currentPrices = prices;

        document.getElementById('withSkinPrice').value = currentPrices.withSkinPrice;
        document.getElementById('skinlessPrice').value = currentPrices.skinlessPrice;
        document.getElementById('eggsPrice').value = currentPrices.eggsPrice;
        document.getElementById('liveRate').value = currentPrices.liveRate;

        // Update summary display
        updatePriceSummary(currentPrices, currentPrices);
    });
}

// Update prices in Firebase
async function updatePrices(event) {
    event.preventDefault();
    
    try {
        // Check if user is authenticated
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated');
        }

        const oldPrices = { ...currentPrices };
        
        const newPrices = {
            withSkinPrice: parseFloat(document.getElementById('withSkinPrice').value),
            skinlessPrice: parseFloat(document.getElementById('skinlessPrice').value),
            eggsPrice: parseFloat(document.getElementById('eggsPrice').value),
            liveRate: parseFloat(document.getElementById('liveRate').value),
            lastUpdated: new Date().toISOString(),
            updatedBy: user.email
        };

        console.log('Attempting to update prices:', newPrices);

        // Update Firebase with authentication token
        const pricesRef = ref(database, 'prices');
        await set(pricesRef, newPrices);
        
        // Update local state
        currentPrices = newPrices;
        
        // Show success message
        alert('Prices updated successfully!');
        
        // Update summary display
        updatePriceSummary(oldPrices, newPrices);
    } catch (error) {
        console.error('Error updating prices:', error);
        if (error.message === 'User not authenticated') {
            alert('Your session has expired. Please log in again.');
            window.location.href = 'admin-login.html';
        } else {
            alert('Error updating prices. Please try again.');
        }
    }
}

// Function to update price summary display
function updatePriceSummary(oldPrices, newPrices) {
    const priceElements = {
        'withSkinCurrent': 'withSkinPrice',
        'skinlessCurrent': 'skinlessPrice',
        'eggsCurrent': 'eggsPrice',
        'liveRateCurrent': 'liveRate'
    };

    for (const [elementId, priceKey] of Object.entries(priceElements)) {
        const element = document.getElementById(elementId);
        if (element) {
            const price = newPrices[priceKey];
            const unit = priceKey === 'eggsPrice' ? '' : '/kg';
            element.textContent = formatPrice(price, unit);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded, initializing...");
    
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, load prices
            loadCurrentPrices();
        } else {
            // No user is signed in, redirect to login
            window.location.href = 'admin-login.html';
        }
    });

    // Add form submit handler
    const priceUpdateForm = document.getElementById('priceUpdateForm');
    if (priceUpdateForm) {
        priceUpdateForm.addEventListener('submit', updatePrices);
    }

    // Add logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await signOut(auth);
            window.location.href = "index.html";
        });
    }
}); 