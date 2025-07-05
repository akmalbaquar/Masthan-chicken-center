// Firebase Configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAefiwRw1-CGmKPpBzhs1kveUPdc82UWAU",
    authDomain: "masthan-prices.firebaseapp.com",
    databaseURL: "https://masthan-prices-default-rtdb.firebaseio.com",
    projectId: "masthan-prices",
    storageBucket: "masthan-prices.firebasestorage.app",
    messagingSenderId: "879026480403",
    appId: "1:879026480403:web:1abbf69da8ef379ccd26e6",
    measurementId: "G-LCCQZS6Q1V"
};

// Default prices in case Firebase is empty
export const defaultPrices = {
    withSkinPrice: 180,
    skinlessPrice: 220,
    eggsPrice: 579,
    liveRate: 100,
    lastUpdated: new Date().toISOString()
};

// Utility function to format price with currency symbol
export function formatPrice(price, unit = '') {
    return `₹${price}${unit}`;
} 