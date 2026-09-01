# Mizo Bible & Dictionary Web App

A simple, fast, and beautiful web interface for searching the Mizo Holy Bible and an English-Mizo Dictionary, powered by the [BnD REST API](https://bnd.lushai.dev/). The user interface features a modern "sunset" theme.

![Mizo Bible and Dictionary Screenshot](https://kawding.com/w/php/mizo-bible-sunset.png)

## Features

*   **Dual Functionality**: Seamlessly switch between Bible and Dictionary search with animated tab switching.
*   **Enhanced UI/UX**: Modern glass-morphism design with smooth animations and micro-interactions.
*   **Responsive Design**: Fully responsive layout with touch-friendly mobile interface.
*   **Modern Theme**: Dynamic gradient background with "sunset" inspired color scheme.
*   **Secure**: API key is managed via a `.env` file and not exposed in public code.
*   **Efficient**: Uses modern JavaScript (`fetch`, `async/await`) for fast, non-blocking API calls.
*   **Improved Error Handling**: Specific error messages for API issues, rate limiting, and validation.
*   **Accessibility**: ARIA labels, focus states, and keyboard navigation support.
*   **Visual Feedback**: Loading spinners, success messages, and staggered result animations.
*   **Search Highlighting**: Automatic highlighting of search terms in results.

## Architecture

*   **Frontend**: HTML5, CSS3 (Custom Properties, Animations), JavaScript ES6+
*   **Backend (Configuration)**: PHP for loading environment variables securely
*   **API Integration**: Consumes the external `bnd.lushai.dev` REST API with proper error handling
*   **Design System**: Modern component-based UI with consistent spacing, colors, and typography
*   **Performance**: Optimized assets, lazy loading, and efficient API calls

### File Structure

```
.
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       └── app.js
├── config
│   └── bootstrap.php
├── .env
├── .gitignore
├── index.php
├── README.md
└── walkthrough.md
```

## Setup & Installation

Follow these steps to run the project locally.

### 1. Prerequisites

*   A local web server with PHP 7.4+ installed (e.g., XAMPP, WAMP, or PHP's built-in server)
*   An API Key from [BnD by Lushai Dev](https://bnd.lushai.dev/)
*   Modern web browser (Chrome, Firefox, Safari, Edge)

### 2. Configuration

1.  Clone or download this repository
2.  Rename the file `sample.env` to `.env` if one is provided, or create a new file named `.env` in the project root
3.  Open the `.env` file and add your API key:

    ```env
    BND_API_KEY="bnd_live_your_unique_api_token_here"
    API_BASE_URL="https://bnd.lushai.dev/api/v1"
    ```
    Replace `bnd_live_your_unique_api_token_here` with your actual key from the BnD website

### 3. Running the Application

1.  Navigate to the project directory in your terminal
2.  Start the PHP built-in web server:

    ```bash
    php -S localhost:8000
    ```

3.  Open your web browser and go to `http://localhost:8000`
4.  **Pro tip**: Use browser developer tools (F12) to monitor API calls and see rate limit headers

### 4. Testing the Enhanced UI/UX

1.  **Tab Switching**: Notice the smooth animation when switching between Bible and Dictionary tabs
2.  **Loading States**: Submit a search to see the animated spinner
3.  **Error Handling**: Try submitting empty forms to see validation messages
4.  **Results Display**: Notice the staggered animation when results appear
5.  **Responsive Design**: Resize your browser to see the responsive layout
6.  **Accessibility**: Use Tab key to navigate through the interface

You can now use the application to search for Bible verses and dictionary words with an enhanced user experience!

## UI/UX Enhancements Made

### Visual Improvements
- **Modern Glass-morphism Design**: Frosted glass effect for containers
- **Dynamic Gradient Background**: Animated background with color shifts
- **Enhanced Typography**: Inter font family with proper weight hierarchy
- **Improved Color System**: Consistent color palette with CSS custom properties
- **Better Shadows & Depth**: Layered shadows for depth perception
- **Smoother Animations**: Transitions and keyframe animations throughout

### UX Improvements
- **Animated Tab Switching**: Smooth transitions between sections
- **Loading Spinner**: Visual feedback during API calls
- **Success Messages**: Clear feedback for successful searches
- **Staggered Results**: Results animate in one by one
- **Search Term Highlighting**: Visual emphasis on found terms
- **Form Validation**: Immediate feedback for empty submissions
- **Rate Limit Awareness**: Messages when API limits are reached

### Technical Improvements
- **Accessibility**: ARIA labels, focus states, keyboard navigation
- **Performance**: Optimized CSS with minimal repaints
- **Responsive Design**: Mobile-first approach with touch targets
- **Error Handling**: Specific, user-friendly error messages
- **Code Organization**: Modular CSS with custom properties

---

⚡ **Built with [KAWDING](https://kawding.com) - AI Fullstack PHP Studio**