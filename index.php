<?php require_once __DIR__ . '/config/bootstrap.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Mizo Bible & Dictionary - Search the Mizo Holy Bible and English-Mizo Dictionary">
    <meta name="theme-color" content="#6366f1">
    <title>Mizo Bible & Dictionary</title>
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <link rel="apple-touch-icon" href="assets/favicon.svg">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <div class="container">
<header>
    <div class="mascot">
        <img src="assets/mascot.svg" alt="Mizo Bible & Dictionary Mascot" width="80" height="80">
    </div>
    <h1>Mizo Bible & Dictionary</h1>
    <p>BnD API hmanga siam</p>
</header>

        <div class="tabs">
            <button id="bible-tab" class="tab-btn active" data-section="bible-section">
                <span class="icon">📖</span>
                Bible
            </button>
            <button id="dict-tab" class="tab-btn" data-section="dictionary-section">
                <span class="icon">📚</span>
                Dictionary
            </button>
        </div>

        <div id="daily-highlights" class="daily-section">
            <div class="daily-card">
                <h3><span class="icon">✨</span> Verse of the Day</h3>
                <div id="daily-verse-content" class="daily-content">
                    <div class="spinner small"></div>
                </div>
            </div>
            <div class="daily-card">
                <h3><span class="icon">📖</span> Word of the Day</h3>
                <div id="daily-word-content" class="daily-content">
                    <div class="spinner small"></div>
                </div>
            </div>
        </div>

        <main>
            <section id="bible-section" class="search-section">
                <h2><span class="icon">📖</span> Bible Chang Zawnna</h2>
                <form id="bible-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="bible-version" class="sr-only">Bible Version</label>
                            <select id="bible-version" name="code" aria-label="Select Bible Version">
                                <option value="mizo">Mizo Holy Bible</option>
                                <option value="kjv">King James Version (KJV)</option>
                                <option value="niv">New International Version (NIV)</option>
                                <option value="esv">English Standard Version (ESV)</option>
                                <option value="web">World English Bible (WEB)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="book" style="display: none;">Lehkhabu</label>
                            <input type="text" id="book" name="book" placeholder="Lehkhabu (e.g. Johana)" aria-label="Book name">
                        </div>
                        <div class="form-group">
                            <label for="chapter" style="display: none;">Bung</label>
                            <input type="number" id="chapter" name="chapter" placeholder="Bung" min="1" aria-label="Chapter number">
                        </div>
                        <div class="form-group">
                            <label for="verse" style="display: none;">Châng</label>
                            <input type="number" id="verse" name="verse" placeholder="Châng" min="1" aria-label="Verse number">
                        </div>
                    </div>
                    <button type="submit">
                        <i class="fas fa-search"></i>
                        Zawnna
                    </button>
                </form>
            </section>

            <section id="dictionary-section" class="search-section hidden">
                <h2><span class="icon">📚</span> Dictionary</h2>
                <form id="dictionary-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dict-direction" class="sr-only">Direction</label>
                            <select id="dict-direction" name="code" aria-label="Select Dictionary Direction">
                                <option value="eng_mizo">English to Mizo</option>
                                <option value="mizo_eng">Mizo to English</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="word" style="display: none;">Word</label>
                            <input type="text" id="word" name="word" placeholder="Zawn tur thu mal (e.g. Faith)" aria-label="Word to search">
                        </div>
                    </div>
                    <button type="submit">
                        <i class="fas fa-search"></i>
                        Zawnna
                    </button>
                </form>
            </section>

            <div id="results" aria-live="polite">
                <div class="placeholder">
                    <div class="icon">📚</div>
                    <p>Result-te he tah hian a lo lang ang.</p>
                </div>
            </div>
            
            <div id="load-more-container" class="hidden">
                <button id="load-more-btn" class="btn-secondary">
                    <i class="fas fa-sync-alt"></i> Load More
                </button>
            </div>
        </main>
    </div>

    <script>
        // Pass PHP environment variables to JavaScript securely
        const BND_API_KEY = '<?php echo htmlspecialchars($_ENV['BND_API_KEY'] ?? '', ENT_QUOTES, 'UTF-8'); ?>';
        const API_BASE_URL = '<?php echo htmlspecialchars($_ENV['API_BASE_URL'] ?? '', ENT_QUOTES, 'UTF-8'); ?>';
    </script>
    <script src="assets/js/app.js"></script>

</body>
</html>