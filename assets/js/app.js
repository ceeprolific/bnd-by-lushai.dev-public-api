document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const bibleTab = document.getElementById('bible-tab');
    const dictTab = document.getElementById('dict-tab');
    const bibleSection = document.getElementById('bible-section');
    const dictionarySection = document.getElementById('dictionary-section');
    
    const bibleForm = document.getElementById('bible-form');
    const dictionaryForm = document.getElementById('dictionary-form');
    const resultsContainer = document.getElementById('results');

    // Tab switching logic
    bibleTab.addEventListener('click', () => {
        bibleTab.classList.add('active');
        dictTab.classList.remove('active');
        bibleSection.classList.remove('hidden');
        dictionarySection.classList.add('hidden');
    });

    dictTab.addEventListener('click', () => {
        dictTab.classList.add('active');
        bibleTab.classList.remove('active');
        dictionarySection.classList.remove('hidden');
        bibleSection.classList.add('hidden');
    });

    // Form submission handlers
    bibleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const book = document.getElementById('book').value.trim();
        const chapter = document.getElementById('chapter').value.trim();
        const verse = document.getElementById('verse').value.trim();
        searchBible({ book, chapter, verse });
    });

    dictionaryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = document.getElementById('word').value.trim();
        searchDictionary({ q: word });
    });

    // --- API Fetching Functions ---

    const showLoading = () => {
        resultsContainer.innerHTML = `<p class="loading-message">A la mek... chawng lawk...</p>`;
    };
    
    const showError = (message) => {
        resultsContainer.innerHTML = `<p class="error-message">Hriatthiam loh thil a awm: ${message}</p>`;
    };

    const fetchFromApi = async (endpoint, params) => {
        if (!BND_API_KEY || BND_API_KEY === 'bnd_live_your_unique_api_token_here') {
            showError("API Key a ngai. .env file-ah i API key dik tak dah luh tur.");
            return;
        }

        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/${endpoint}?${query}`;
        
        showLoading();

        try {
            const response = await fetch(url, {
                headers: {
                    'x-api-key': BND_API_KEY
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('API Error:', error);
            showError(error.message);
            return null;
        }
    };

    const searchBible = async (params) => {
        const data = await fetchFromApi('bibles', params);
        if (data) displayBibleResults(data);
    };

    const searchDictionary = async (params) => {
        const data = await fetchFromApi('dictionaries', params);
        if (data) displayDictionaryResults(data);
    };


    // --- Display Functions ---
    
    const displayBibleResults = (data) => {
        resultsContainer.innerHTML = '';
        if (data.status === 'success' && data.data.length > 0) {
            data.data.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result-item';
                resultDiv.innerHTML = `
                    <h3>${item.book} ${item.chapter}:${item.verse}</h3>
                    <div class="meta">${item.bible_name}</div>
                    <p class="text">${item.text}</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            resultsContainer.innerHTML = `<p class="no-results">Hmuh tur a awm lo.</p>`;
        }
    };
    
    const displayDictionaryResults = (data) => {
        resultsContainer.innerHTML = '';
        if (data.status === 'success' && data.data.length > 0) {
            data.data.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result-item';
                resultDiv.innerHTML = `
                    <h3>${item.word}</h3>
                    <div class="meta">${item.dictionary_title}</div>
                    <p class="definition">${item.definition}</p>
                    ${item.example ? `<p class="example">Entirna: <em>"${item.example}"</em></p>` : ''}
                `;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            resultsContainer.innerHTML = `<p class="no-results">Hmuh tur a awm lo.</p>`;
        }
    };
});