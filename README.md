# Mizo Bible & Dictionary Web App

A simple, fast, and beautiful web interface for searching the Mizo Holy Bible and an English-Mizo Dictionary, powered by the [BnD REST API](https://bnd.lushai.dev/). The user interface features a modern "sunset" theme.

![Mizo Bible and Dictionary Screenshot](https://kawding.com/w/php/mizo-bible-sunset.png)

## Features

*   **Dual Functionality**: Seamlessly switch between Bible and Dictionary search.
*   **Responsive Design**: Looks great on both desktop and mobile devices.
*   **Modern UI**: A "sunset" inspired dark theme that is easy on the eyes.
*   **Secure**: API key is managed via a `.env` file and not exposed in public code.
*   **Efficient**: Uses modern JavaScript (`fetch`, `async/await`) for fast, non-blocking API calls.

## Architecture

*   **Frontend**: HTML, CSS, JavaScript
*   **Backend (Configuration)**: PHP for loading environment variables.
*   **API**: Consumes the external `bnd.lushai.dev` REST API.

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

*   A local web server with PHP installed (e.g., XAMPP, WAMP, or PHP's built-in server).
*   An API Key from [BnD by Lushai Dev](https://bnd.lushai.dev/).

### 2. Configuration

1.  Clone or download this repository.
2.  Rename the file `sample.env` to `.env` if one is provided, or create a new file named `.env` in the project root.
3.  Open the `.env` file and add your API key:

    ```env
    BND_API_KEY="bnd_live_your_unique_api_token_here"
    API_BASE_URL="https://bnd.lushai.dev/api/v1"
    ```
    Replace `bnd_live_your_unique_api_token_here` with your actual key.

### 3. Running the Application

1.  Navigate to the project directory in your terminal.
2.  Start the PHP built-in web server:

    ```bash
    php -S localhost:8000
    ```

3.  Open your web browser and go to `http://localhost:8000`.

You can now use the application to search for Bible verses and dictionary words.

---

⚡ **Built with [KAWDING](https://kawding.com) - AI Fullstack PHP Studio**