# Mastan Broiler Poultry Traders

A modern web application for displaying and managing poultry product prices with real-time updates using Firebase.

## Project Structure

```
Masthan-chicken-center/
├── index.html              # Main landing page
├── admin-login.html        # Admin authentication page
├── admin-dashboard.html    # Admin price management dashboard
├── styles.css              # Main stylesheet (legacy)
├── css/
│   ├── shared.css          # Common styles across all pages
│   ├── main.css            # Main page specific styles
│   ├── admin-dashboard.css # Admin dashboard specific styles
│   └── admin-login.css     # Admin login specific styles
├── js/
│   ├── config.js           # Shared Firebase configuration
│   ├── main.js             # Main page JavaScript functionality
│   ├── admin-dashboard.js  # Admin dashboard JavaScript
│   └── admin-login.js      # Admin login JavaScript
├── images/                 # Product images
└── README.md              # This file
```

## Features

### Main Page (index.html)
- **Real-time Price Display**: Shows current prices for chicken products and eggs
- **Responsive Design**: Mobile-friendly interface
- **Scroll Animations**: Smooth reveal animations for content
- **Progress Indicator**: Visual scroll progress bar
- **Back to Top**: Easy navigation button

### Admin Dashboard (admin-dashboard.html)
- **Price Management**: Update product prices in real-time
- **Live Price Summary**: View current prices at a glance
- **Firebase Integration**: Secure data storage and synchronization
- **Authentication**: Protected admin access

### Admin Login (admin-login.html)
- **Secure Authentication**: Firebase Auth integration
- **Session Management**: Automatic login state handling
- **Error Handling**: User-friendly error messages

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication, Realtime Database)
- **Styling**: Custom CSS with responsive design
- **Fonts**: Google Fonts (Poppins)

## File Organization

### CSS Files
- `styles.css`: Main stylesheet (legacy - kept for compatibility)
- `css/shared.css`: Common styles, variables, and utilities used across all pages
- `css/main.css`: Main page specific styles (hero, navigation, prices, features, contact)
- `css/admin-dashboard.css`: Admin dashboard specific styles
- `css/admin-login.css`: Admin login page specific styles

### JavaScript Files
- `js/config.js`: Shared Firebase configuration and utility functions
- `js/main.js`: Main page functionality (price display, animations, navigation)
- `js/admin-dashboard.js`: Admin dashboard functionality (price management, authentication)
- `js/admin-login.js`: Login page functionality (authentication handling)

## Firebase Configuration

The application uses Firebase for:
- **Authentication**: Secure admin login
- **Realtime Database**: Live price updates
- **Analytics**: Usage tracking

Configuration is centralized in `js/config.js` for easy maintenance.

## Setup Instructions

1. Clone or download the project files
2. Open `index.html` in a web browser
3. For admin access, navigate to the admin login page
4. Use Firebase authentication credentials

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Security Features

- Firebase Authentication for admin access
- Secure data transmission
- Input validation
- Session management

## Performance Optimizations

- Separated CSS and JavaScript files for better caching
- Modular JavaScript architecture
- Optimized images
- Minimal external dependencies

## Maintenance

- Update prices through the admin dashboard
- Monitor Firebase console for usage analytics
- Regular backup of Firebase data
- Keep Firebase SDK versions updated

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please contact:
- Email: akmalbaquar@gmail.com
- Phone: +91 9490362478

## Future Enhancements

- [ ] Add user authentication
- [ ] Implement database storage
- [ ] Add order management system
- [ ] Include payment gateway
- [ ] Add customer feedback system 
