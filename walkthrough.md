# Walkthrough: Mizo Bible & Dictionary Web App

He project hian `bnd.lushai.dev` API hmangin Mizo Bible leh English-Mizo Dictionary enna website awlsam tak a siam. A landan (UI) chu `sunset` theme niin, a mawiin a hman a nuam.

## Files Created & Their Purpose

1.  **`.env`**:
    *   API Key (`BND_API_KEY`) leh API Base URL (`API_BASE_URL`) dahna hmun. Hei hi i API key dik takin i thlak ang.
    *   **SECURITY**: He file hi public-ah dah tur a ni lo. `.gitignore` hmanga venhim a ni.

2.  **`config/bootstrap.php`**:
    *   He script hian `.env` file a mi environment variables te chu PHP application-ah a load lut a, `$_ENV` superglobal-ah a dah a.

3.  **`index.php`**:
    *   Website-a langsar ber tur, user-in a hmuh hmasak ber tur file a ni.
    *   Bible leh Dictionary zawnna form te a awm.
    *   Tab hmangin Bible leh Dictionary zawnna a inthlak thei.
    *   API Key chu `config/bootstrap.php` atangin `$_ENV` hmanga lain, JavaScript-ah him takin a pe chhawng (`htmlspecialchars` hmanga venhim).

4.  **`assets/css/style.css`**:
    *   "Sunset" theme duan lawk ang taka chei a ni.
    *   A color-scheme chu a thim lam pang, `dark blue`, `purple`, `orange` leh `red` te inpawlh a ni.
    *   CSS Variables (`:root`) hman a ni a, color thlak danglam a awlsam phah.

5.  **`assets/js/app.js`**:
    *   Website chet velna (logic) zawng zawng awmna a ni.
    *   **Tab Switching**: Bible leh Dictionary tab-te hmeh a an section inthlak tur a siam.
    *   **API Calls**: `fetch()` API (async/await) hmangin `bnd.lushai.dev`-ah request a thawn.
        *   Request `headers`-ah `x-api-key` a telh.
        *   `URLSearchParams` hmangin query parameters a siam a, hei hian special character te him takin a encode.
    *   **Display Results**: API atanga data dawn chu `result-item` class hmangin mawi takin a pho lang.
    *   **Error Handling**: API Key a dik loh emaw, network-ah harsatna a awm emaw, result a awm loh pawhin user hnenah hriattirna chiang tak a pe.

## How to Test the Application

1.  **Configure `.env`**:
    *   `api.txt`-a an sawi angin `bnd.lushai.dev` atanga i API key i lak chhuah kha `bnd_live_your_unique_api_token_here` aiah khan dah lut rawh.

2.  **Run a Local PHP Server**:
    *   I project folder-ah khan terminal/command prompt hawng la, he command hi chhu rawh:
        ```bash
        php -S localhost:8000
        ```

3.  **Open in Browser**:
    *   Web browser-ah `http://localhost:8000` ah lut rawh.

4.  **Test Functionality**:
    *   **Bible Search**:
        *   Book: `Sam`
        *   Chapter: `23`
        *   Verse: `1`
        *   "Zawnna" button hmet rawh. Result-ah "LALPA chu ka vengtu a ni a..." tih a lo lang tur a ni.
    *   **Dictionary Search**:
        *   Dictionary tab-ah inthlak rawh.
        *   Word: `Faith`
        *   "Zawnna" button hmet rawh. A Mizo awmzia "Rinna" tih leh a hrilhfiahna a lo lang tur a ni.