# Mizo Bible & Dictionary Web App

A simple, fast, and beautiful web interface for searching the Mizo Holy Bible and an English-Mizo Dictionary, powered by the [BnD REST API](https://bnd.lushai.dev/). The user interface features a modern "sunset" theme, now upgraded with a stunning glassmorphism design, animated aurora background, floating particles, and fluid micro-interactions.

![Mizo Bible and Dictionary Screenshot](https://kawding.com/w/php/mizo-bible-sunset.png)

## Features

*   **Daily Highlights**: Displays "Verse of the Day" and "Word of the Day" on the home screen using the `/daily` API endpoint.
*   **Multi-Version Bible Search**: Select from multiple Bible translations (Mizo, KJV, NIV, ESV, WEB) via a dropdown selector.
*   **Bi-directional Dictionary**: Switch between "English to Mizo" and "Mizo to English" dictionary modes.
*   **Pagination (Load More)**: Efficiently loads results in batches with a "Load More" button to handle large datasets.
*   **Dual Functionality**: Seamlessly switch between Bible and Dictionary search with animated tab switching.
*   **Enhanced UI/UX**: Modern glass-morphism design with smooth animations and micro-interactions.
*   **Responsive Design**: Fully responsive layout with touch-friendly mobile interface.
*   **Modern Theme**: Dynamic aurora gradient background with "sunset" inspired color scheme, floating particles, and animated borders.
*   **Secure**: API key is managed via a `.env` file and not exposed in public code.
*   **Efficient**: Uses modern JavaScript (`fetch`, `async/await`) for fast, non-blocking API calls.
*   **Improved Error Handling**: Specific error messages for API issues, rate limiting, and validation.
*   **Accessibility**: ARIA labels, focus states, and keyboard navigation support.
*   **Visual Feedback**: Loading spinners, toast notifications, and staggered result animations.
*   **Search Highlighting**: Automatic highlighting of search terms in results.
*   **Custom Favicon**: Themed SVG favicon (open book with sparkle) matching the sunset/indigo color scheme.
*   **Mascot Logo**: Friendly open book mascot with a smile displayed prominently in the header, adding personality to the app.
*   **SVG Icons (No Emojis)**: All UI icons are rendered as crisp, scalable inline SVG graphics, replacing platform-dependent emojis for consistent cross-browser appearance.
*   **Scroll to Top**: Floating button appears after scrolling for quick navigation.
*   **Toast Notifications**: Non-intrusive pop-up messages for success and error feedback.

## Architecture

*   **Frontend**: HTML5, CSS3 (Custom Properties, Animations, Glassmorphism), JavaScript ES6+
*   **Backend (Configuration)**: PHP for loading environment variables securely
*   **API Integration**: Consumes the external `bnd.lushai.dev` REST API with proper error handling
*   **Design System**: Modern component-based UI with consistent spacing, colors, and typography
*   **Performance**: Optimized assets, lazy loading, and efficient API calls
*   **Features**: Daily highlights, multi-version Bible search, bi-directional dictionary, pagination, toast notifications, scroll-to-top

### File Structure

```
.
├── assets
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── app.js
│   ├── favicon.svg
│   └── mascot.svg
├── config
│   └── bootstrap.php
├── .env
├── .gitignore
├── api.txt
├── index.php
├── README.md
└── walkthrough.md
```

### Key Enhancements Implemented

1.  **Daily Highlights**: Fetches and displays the "Verse of the Day" and "Word of the Day" from the `/daily` API endpoint on page load.
2.  **Bible Version Selector**: Added a dropdown to select between Mizo, KJV, NIV, ESV, and WEB translations.
3.  **Dictionary Direction Selector**: Added a dropdown to switch between "English to Mizo" and "Mizo to English" dictionaries.
4.  **Pagination**: Implemented a "Load More" button to fetch and append additional results in batches of 10, improving performance for large result sets.
5.  **Enhanced Styling**: Updated CSS to style the new dropdowns, daily highlight cards, and load more button consistently with the sunset theme.
6.  **Visual Overhaul**: Added aurora gradient background, floating particles, animated container border, glassmorphism, shimmer effects, bouncy hovers, scroll-to-top button, and toast notifications for a stunning modern experience.

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

1.  **Daily Highlights**: Check the top section for the daily verse and word. The loading spinners should disappear even if your API key is invalid.
2.  **Bible Version Selection**: Use the dropdown to select different Bible translations.
3.  **Dictionary Direction**: Use the dropdown to switch between English-Mizo and Mizo-English.
4.  **Pagination**: Search for a common term and use the "Load More" button.
5.  **Tab Switching**: Notice the smooth animation when switching between Bible and Dictionary tabs.
6.  **Loading States**: Submit a search to see the animated spinner.
7.  **Error Handling**: Try submitting empty forms to see validation toast messages.
8.  **Results Display**: Notice the staggered animation when results appear.
9.  **Responsive Design**: Resize your browser to see the responsive layout.
10. **Accessibility**: Use Tab key to navigate through the interface.
11. **Scroll-to-top**: Scroll down the page, then click the floating button to return to top.
12. **Toast Notifications**: Successful searches show a green toast; errors show red toast.

You can now use the application to search for Bible verses and dictionary words with an enhanced user experience!

## UI/UX Enhancements Made (Latest Upgrade)

### Visual Improvements
- **Animated Aurora Background**: Multi-color radial gradients float and blur behind the content.
- **Floating Particles**: Delicate glowing specks drift upward for an immersive feel.
- **Animated Container Border**: A slow-moving gradient border surrounds the main card.
- **Modern Glass-morphism Design**: Frosted glass effect for containers, cards, and tabs.
- **Shimmer Effects**: Buttons and active tabs have a light sweep animation.
- **Bouncy Micro-interactions**: Elements lift with springy transitions on hover.
- **Enhanced Typography**: Inter and Sora font families with proper weight hierarchy.
- **Improved Color System**: Consistent CSS custom properties for easy theme tweaking.
- **Better Shadows & Depth**: Layered shadows and glows for depth perception.
- **Daily Highlights Cards**: Visually distinct cards with pulsing mascot halo.
- **Styled Select Dropdowns**: Custom-styled dropdowns matching the input fields.
- **Toast Notifications**: Elegant slide-in messages for success, error, and info.
- **Scroll-to-top Button**: Floating gradient button that appears after scrolling.
- **BUG FIX**: Resolved issue where "Verse of the Day" and "Word of the Day" spinners would persist indefinitely if the API key was invalid or an error occurred.

### UX Improvements
- **Daily Highlights**: Instant value on page load with Verse/Word of the Day.
- **Multi-Version Search**: Ability to search different Bible translations.
- **Bi-directional Dictionary**: Switch between language directions easily.
- **Pagination**: "Load More" button for seamless browsing of large result sets.
- **Animated Tab Switching**: Smooth transitions between sections.
- **Loading Spinner**: Visual feedback during API calls.
- **Toast Feedback**: Clear, non-intrusive feedback for successful searches and errors.
- **Staggered Results**: Results animate in one by one.
- **Search Term Highlighting**: Visual emphasis on found terms.
- **Form Validation**: Immediate feedback for empty submissions.
- **Rate Limit Awareness**: Messages when API limits are reached.
- **Quick Navigation**: Scroll-to-top button for long result lists.

### Technical Improvements
- **Accessibility**: ARIA labels, focus states, keyboard navigation, `.sr-only` utility class.
- **Performance**: Optimized CSS with minimal repaints, lazy loading of daily content, efficient particle generation.
- **Responsive Design**: Mobile-first approach with touch-friendly targets.
- **Error Handling**: Specific, user-friendly error messages via toast notifications.
- **Code Organization**: Modular CSS with custom properties, clean JS with reusable functions.
- **Pagination State Management**: Clean handling of offset/limit in JS.
- **Particle System**: Lightweight DOM-based particles without heavy libraries.

---

⚡ **Built with [KAWDING](https://kawding.com) - AI Fullstack PHP Studio**