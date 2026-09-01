<?php require_once __DIR__ . '/config/bootstrap.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mizo Bible & Dictionary</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>

    <div class="container">
        <header>
            <h1>Mizo Bible & Dictionary</h1>
            <p>BnD API hmanga siam</p>
        </header>

        <div class="tabs">
            <button id="bible-tab" class="tab-btn active" data-section="bible-section">Bible</button>
            <button id="dict-tab" class="tab-btn" data-section="dictionary-section">Dictionary</button>
        </div>

        <main>
            <section id="bible-section" class="search-section">
                <h2>Bible Chang Zawnna</h2>
                <form id="bible-form">
                    <div class="form-row">
                        <input type="text" id="book" name="book" placeholder="Lehkhabu (e.g. Johana)">
                        <input type="number" id="chapter" name="chapter" placeholder="Bung">
                        <input type="number" id="verse" name="verse" placeholder="Châng">
                    </div>
                    <button type="submit">Zawnna</button>
                </form>
            </section>

            <section id="dictionary-section" class="search-section hidden">
                <h2>Dictionary</h2>
                <form id="dictionary-form">
                    <input type="text" id="word" name="word" placeholder="Zawn tur thu mal (e.g. Faith)">
                    <button type="submit">Zawnna</button>
                </form>
            </section>

            <div id="results">
                <p class="placeholder">Result-te he tah hian a lo lang ang.</p>
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