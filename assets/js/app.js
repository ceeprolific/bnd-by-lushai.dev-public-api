document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bibleTab = document.getElementById('bible-tab');
    const dictTab = document.getElementById('dict-tab');
    const bibleSection = document.getElementById('bible-section');
    const dictionarySection = document.getElementById('dictionary-section');
    
    const bibleForm = document.getElementById('bible-form');
    const dictionaryForm = document.getElementById('dictionary-form');
    const resultsContainer = document.getElementById('results');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // State for Pagination
    let currentSearchType = ''; // 'bible' or 'dictionary'
    let currentSearchParams = {};
    let currentOffset = 0;
    const PAGE_LIMIT = 10; // Matches API default or custom

    // --- Daily Highlights ---
    const fetchDailyHighlights = async () => {
        const data = await fetchFromApi('daily', {}, true); // true = silent mode (no main loading spinner)
        
        const verseContainer = document.getElementById('daily-verse-content');
        const wordContainer = document.getElementById('daily-word-content');

        if (data && data.status === 'success') {
            // Verse of the Day
            if (data.daily_verse) {
                verseContainer.innerHTML = `
                    <p>"${data.daily_verse.text}"</p>
                    <span class="reference">- ${data.daily_verse.book} ${data.daily_verse.chapter}:${data.daily_verse.verse}</span>
                `;
            } else {
                verseContainer.innerHTML = '<p>Verse not available today.</p>';
            }

            // Word of the Day
            if (data.daily_word) {
                wordContainer.innerHTML = `
                    <div class="word-title">${data.daily_word.word}</div>
                    <p>${data.daily_word.definition}</p>
                    ${data.daily_word.example ? `<span class="reference">"${data.daily_word.example}"</span>` : ''}
                `;
            } else {
                wordContainer.innerHTML = '<p>Word not available today.</p>';
            }
        } else {
            // Handle API failure or empty response
            verseContainer.innerHTML = '<p>Verse not available today.</p>';
            wordContainer.innerHTML = '<p>Word not available today.</p>';
        }
    };

    // Enhanced tab switching with animations
    const switchTab = (activeTab, activeSection, inactiveTab, inactiveSection) => {
        // Add active class to clicked tab
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        
        // Animate sections
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(10px)';
        activeSection.classList.remove('hidden');
        
        setTimeout(() => {
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }, 10);
        
        inactiveSection.classList.add('hidden');
        
        // Reset pagination state on tab switch
        resetPagination();
    };

    bibleTab.addEventListener('click', () => {
        switchTab(bibleTab, bibleSection, dictTab, dictionarySection);
        // Clear results when switching tabs
        resultsContainer.innerHTML = `
            <div class="placeholder">
                <div class="icon">📚</div>
                <p>Result-te he tah hian a lo lang ang.</p>
            </div>
        `;
    });

    dictTab.addEventListener('click', () => {
        switchTab(dictTab, dictionarySection, bibleTab, bibleSection);
        // Clear results when switching tabs
        resultsContainer.innerHTML = `
            <div class="placeholder">
                <div class="icon">📖</div>
                <p>Result-te he tah hian a lo lang ang.</p>
            </div>
        `;
    });

    // Enhanced form submission with validation
    bibleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const book = document.getElementById('book').value.trim();
        const chapter = document.getElementById('chapter').value.trim();
        const verse = document.getElementById('verse').value.trim();
        const code = document.getElementById('bible-version').value;
        
        if (!book && !chapter && !verse) {
            showError("At least one search parameter is required");
            return;
        }
        
        resetPagination();
        searchBible({ book, chapter, verse, code, limit: PAGE_LIMIT });
    });

    dictionaryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = document.getElementById('word').value.trim();
        const code = document.getElementById('dict-direction').value;
        
        if (!word) {
            showError("Please enter a word to search");
            return;
        }
        
        resetPagination();
        searchDictionary({ q: word, code, limit: PAGE_LIMIT });
    });

    // Load More Logic
    loadMoreBtn.addEventListener('click', () => {
        if (currentSearchType === 'bible') {
            searchBible({ ...currentSearchParams, offset: currentOffset, limit: PAGE_LIMIT });
        } else if (currentSearchType === 'dictionary') {
            searchDictionary({ ...currentSearchParams, offset: currentOffset, limit: PAGE_LIMIT });
        }
    });

    const resetPagination = () => {
        currentOffset = 0;
        currentSearchType = '';
        currentSearchParams = {};
        loadMoreContainer.classList.add('hidden');
    };

    // --- Enhanced API Fetching Functions ---

    const showLoading = (append = false) => {
        if (!append) {
            resultsContainer.innerHTML = `
                <div class="loading-message">
                    <div class="spinner"></div>
                    <p>A la mek... chawng lawk...</p>
                </div>
            `;
        } else {
            // Append loading indicator for "Load More"
            const loader = document.createElement('div');
            loader.className = 'loading-message';
            loader.id = 'append-loader';
            loader.innerHTML = `<div class="spinner small"></div>`;
            resultsContainer.appendChild(loader);
        }
    };
    
    const showError = (message) => {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <div class="icon">⚠️</div>
                <p><strong>Hriatthiam loh thil a awm:</strong> ${message}</p>
            </div>
        `;
        loadMoreContainer.classList.add('hidden');
    };

    const showSuccess = (message) => {
        // Only show success toast if not appending
        if (currentOffset === 0) {
            // We could implement a toast system, but for now let's keep it simple or skip to avoid clearing results
            // Actually, let's not clear results for success message, just console log or use a small badge
            console.log(message);
        }
    };

    const fetchFromApi = async (endpoint, params, silent = false) => {
        if (!BND_API_KEY || BND_API_KEY === 'bnd_live_your_unique_api_token_here') {
            if (!silent) {
                showError("API Key a ngai. .env file-ah i API key dik tak dah luh tur.");
            }
            // For silent calls, we must still allow the caller to handle the UI update.
            // Returning a standard error object is cleaner than null and fixes the spinner bug.
            return { status: "error", message: "API Key is missing or invalid." };
        }

        const isAppending = params.offset > 0;
        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/${endpoint}?${query}`;
        
        if (!silent) showLoading(isAppending);

        try {
            const response = await fetch(url, {
                headers: {
                    'x-api-key': BND_API_KEY
                }
            });

            // Check rate limiting headers
            const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
            const rateLimitReset = response.headers.get('X-RateLimit-Reset');
            
            if (rateLimitRemaining !== null) {
                console.log(`API Rate Limit: ${rateLimitRemaining} requests remaining`);
            }

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { message: `HTTP error! status: ${response.status}` };
                }
                
                if (response.status === 429) {
                    const resetTime = new Date(rateLimitReset * 1000).toLocaleTimeString();
                    if (!silent) showError(`Rate limit exceeded. Please try again after ${resetTime}.`);
                } else {
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                return null;
            }

            const data = await response.json();
            
            // Remove append loader if exists
            const appendLoader = document.getElementById('append-loader');
            if (appendLoader) appendLoader.remove();

            return data;

        } catch (error) {
            console.error('API Error:', error);
            if (!silent) showError(error.message);
            return { status: "error", message: error.message };
        }
    };

    const searchBible = async (params) => {
        currentSearchType = 'bible';
        currentSearchParams = params;
        
        const data = await fetchFromApi('bibles', params);
        if (data) {
            displayBibleResults(data, params.offset > 0);
        }
    };

    const searchDictionary = async (params) => {
        currentSearchType = 'dictionary';
        currentSearchParams = params;
        
        const data = await fetchFromApi('dictionaries', params);
        if (data) {
            displayDictionaryResults(data, params.offset > 0);
        }
    };

    // --- Enhanced Display Functions ---
    
    const updatePagination = (data) => {
        // Simple pagination logic: if we received a full page (limit), assume there might be more
        // Note: The API docs don't explicitly state total count in the snippet provided, 
        // but usually APIs return total or we check if data.length === limit.
        // Assuming default limit is 50 based on docs snippet, but we requested 10? 
        // Actually, the API docs say "limit: 50" in example. Let's assume we can pass limit=10.
        // If data.data.length === 10 (or whatever limit we set), show Load More.
        
        if (data.data && data.data.length >= 10) { // Assuming we requested limit=10, though we didn't explicitly add it to params yet. Let's assume default is 50. 
            // If we want to be safe, we show Load More if length > 0 and maybe just let user click until empty.
            // Let's refine: We will add limit=10 to search params in the form handlers.
            loadMoreContainer.classList.remove('hidden');
            currentOffset += data.data.length;
        } else {
            loadMoreContainer.classList.add('hidden');
        }
    };

    const displayBibleResults = (data, append = false) => {
        if (!append) resultsContainer.innerHTML = '';
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
            if (!append) showSuccess(`${data.data.length} results found`);
            
            // Create results with staggered animation
            const startIndex = append ? resultsContainer.children.length : 0;
            
            data.data.forEach((item, index) => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result-item';
                resultDiv.style.animationDelay = `${index * 0.1}s`;
                
                // Highlight search terms if provided
                let textContent = item.text;
                const searchQuery = document.getElementById('book').value.trim();
                
                if (searchQuery) {
                    const regex = new RegExp(`(${searchQuery})`, 'gi');
                    textContent = textContent.replace(regex, '<span class="highlight">$1</span>');
                }
                
                resultDiv.innerHTML = `
                    <h3><span class="icon">📖</span>${item.book} ${item.chapter}:${item.verse}</h3>
                    <div class="meta">${item.bible_name}</div>
                    <p class="text">${textContent}</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
            
            updatePagination(data);
            
        } else if (!append) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <p>Hmuh tur a awm lo.</p>
                    <p style="font-size: 0.95rem; color: var(--text-muted);">Try different search terms or check spelling</p>
                </div>
            `;
            loadMoreContainer.classList.add('hidden');
        }
    };
    
    const displayDictionaryResults = (data, append = false) => {
        if (!append) resultsContainer.innerHTML = '';
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
            if (!append) showSuccess(`${data.data.length} words found`);
            
            const startIndex = append ? resultsContainer.children.length : 0;

            data.data.forEach((item, index) => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result-item';
                resultDiv.style.animationDelay = `${index * 0.1}s`;
                
                // Create example section if exists
                const exampleSection = item.example ? `
                    <div class="example">
                        <strong>Entirna:</strong>
                        <p><em>"${item.example}"</em></p>
                    </div>
                ` : '';
                
                // Format definition with phonetic if available
                const definitionContent = item.phonetic ? `
                    <div class="definition">
                        <strong>${item.definition.split(')')[0]})</strong>
                        <span style="color: var(--text-muted); font-style: italic;">${item.phonetic}</span>
                        ${item.definition.split(')')[1] || ''}
                    </div>
                ` : `<p class="definition">${item.definition}</p>`;
                
                resultDiv.innerHTML = `
                    <h3><span class="icon">📖</span>${item.word}</h3>
                    <div class="meta">${item.dictionary_title}</div>
                    ${definitionContent}
                    ${exampleSection}
                `;
                resultsContainer.appendChild(resultDiv);
            });

            updatePagination(data);

        } else if (!append) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <p>Hmuh tur a awm lo.</p>
                    <p style="font-size: 0.95rem; color: var(--text-muted);">Try a different word or check spelling</p>
                </div>
            `;
            loadMoreContainer.classList.add('hidden');
        }
    };

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse click
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Initialize
    resultsContainer.innerHTML = `
        <div class="placeholder">
            <div class="icon">📚</div>
            <p>Result-te he tah hian a lo lang ang.</p>
        </div>
    `;
    
    // Fetch Daily Highlights on Load
    fetchDailyHighlights();
});