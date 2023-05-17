const DATA = {
    "https://www.devfolio.co": "devfolio",
    "https://www.discord.com": "discord",
    "https://drive.google.com": "drive",
    "https://mail.google.com": "gmail",
    "https://www.linkedin.com": "linkedin",
    "https://www.twitter.com": "twitter",
    "https://www.youtube.com": "youtube",
    "https://www.codechef.com": "codechef",
    "https://chat.openai.com/chat": "chatgpt",
    "https://www.openai.com/dalle": "openai",
    "https://replit.com": "replit",
    "https://vercel.com": "vercel",
    "https://github.com": "github",
    "https://www.itch.io": "itch",
};

class SearchResults {
    searchResultsContainer = document.getElementById('searchResults');
    constructor() {
        this.results = [];
    }

    performSearch(query) {
        this.results = this.getSearchResults(query);
        this.displayResults();
    }

    getSearchResults(query) {
        // Convert query to string if it's not already
        query = String(query);

        // Retrieve the existing queries from localStorage
        const storedQueries = localStorage.getItem('queries');
        let queries = {};
        if (storedQueries) {
            queries = JSON.parse(storedQueries);
        }

        // Fetch search terms remotely based on combined queries and DATA
        const combinedData = { ...DATA, ...queries };

        const filteredResults = Object.entries(combinedData).filter(([url, name]) => {
            const lowercaseQuery = query.toLowerCase().trim();
            const lowercaseName = name.toLowerCase().trim();
            return lowercaseName.includes(lowercaseQuery);
        });

        // Extract URLs and names from the filtered results
        const searchResults = filteredResults.map(([url, name]) => ({ url, name }));

        if (searchResults.length >= 4) {
            searchResults.length = 4;
        }

        return searchResults;
    }

    displayResults() {
        this.searchResultsContainer.innerHTML = '';

        if (this.results.length > 0) {
            for (const result of this.results) {
                const { url, name } = result;

                const link = document.createElement('a');
                link.href = url;
                link.textContent = name;

                const listItem = document.createElement('li');
                listItem.appendChild(link);

                this.searchResultsContainer.appendChild(listItem);
            }
        }
    }
}