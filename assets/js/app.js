document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bibleTab = document.getElementById('bible-tab');
    const dictTab = document.getElementById('dict-tab');
    const bibleSection = document.getElementById('bible-section');
    const dictionarySection = document.getElementById('dictionary-section');
    
    const bibleForm = document.getElementById('bible-form');
    const dictionaryForm = document.getElementById('dictionary-form');
    const resultsContainer = document.getElementById('results');

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
        
        if (!book && !chapter && !verse) {
            showError("At least one search parameter is required");
            return;
        }
        
        searchBible({ book, chapter, verse });
    });

    dictionaryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = document.getElementById('word').value.trim();
        
        if (!word) {
            showError("Please enter a word to search");
            return;
        }
        
        searchDictionary({ q: word });
    });

    // --- Enhanced API Fetching Functions ---

    const showLoading = () => {
        resultsContainer.innerHTML = `
            <div class="loading-message">
                <div class="spinner"></div>
                <p>A la mek... chawng lawk...</p>
            </div>
        `;
    };
    
    const showError = (message) => {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <div class="icon">⚠️</div>
                <p><strong>Hriatthiam loh thil a awm:</strong> ${message}</p>
            </div>
        `;
    };

    const showSuccess = (message) => {
        resultsContainer.innerHTML = `
            <div class="success-message">
                <div class="icon">✓</div>
                <p>${message}</p>
            </div>
        `;
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
                    showError(`Rate limit exceeded. Please try again after ${resetTime}.`);
                } else {
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                return null;
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
        if (data) {
            displayBibleResults(data);
        }
    };

    const searchDictionary = async (params) => {
        const data = await fetchFromApi('dictionaries', params);
        if (data) {
            displayDictionaryResults(data);
        }
    };

    // --- Enhanced Display Functions ---
    
    const displayBibleResults = (data) => {
        resultsContainer.innerHTML = '';
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
            // Show success message for single result
            if (data.data.length === 1) {
                showSuccess(`1 result found`);
            } else {
                showSuccess(`${data.data.length} results found`);
            }
            
            // Create results with staggered animation
            setTimeout(() => {
                resultsContainer.innerHTML = '';
                data.data.forEach((item, index) => {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'result-item';
                    resultDiv.style.animationDelay = `${index * 0.1}s`;
                    
                    // Highlight search terms if provided
                    let textContent = item.text;
                    const searchQuery = document.getElementById('book').value.trim() || 
                                       document.getElementById('chapter').value.trim();
                    
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
            }, 500);
            
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <p>Hmuh tur a awm lo.</p>
                    <p style="font-size: 0.95rem; color: var(--text-muted);">Try different search terms or check spelling</p>
                </div>
            `;
        }
    };
    
    const displayDictionaryResults = (data) => {
        resultsContainer.innerHTML = '';
        
        if (data.status === 'success' && data.data && data.data.length > 0) {
            // Show success message
            if (data.data.length === 1) {
                showSuccess(`1 word found`);
            } else {
                showSuccess(`${data.data.length} words found`);
            }
            
            // Create results with staggered animation
            setTimeout(() => {
                resultsContainer.innerHTML = '';
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
            }, 500);
            
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="icon">🔍</div>
                    <p>Hmuh tur a awm lo.</p>
                    <p style="font-size: 0.95rem; color: var(--text-muted);">Try a different word or check spelling</p>
                </div>
            `;
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

    // Initialize with placeholder
    resultsContainer.innerHTML = `
        <div class="placeholder">
            <div class="icon">📚</div>
            <p>Result-te he tah hian a lo lang ang.</p>
        </div>
    `;
});