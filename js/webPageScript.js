
class WebPageScript {
    constructor() {
        this.commandInput = null;
        this.searchResults = new SearchResults();
        this.assistant = new Assistant();
        this.carousel = new Carousel();
    }

    initialize() {
        this.commandInput = document.getElementById('commandInput');

        this.assistant.greetUser();
        this.commandInput.addEventListener('input', this.handleInput);
        this.commandInput.addEventListener('keydown', this.handleKeyDown);
        this.carousel.startCarousel();
    }

    handleInput = () => {
        const query = this.commandInput.value;
        this.assistant.communicate(query);
        this.searchResults.performSearch(query);
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let query = this.commandInput.value.trim();
            const selectedResult = this.searchResults.getSearchResults(query)[0];

            if (selectedResult) {
                console.log(selectedResult);
                let url = selectedResult.url;
                window.location.href = url;
                this.storeQuery(url, query);
            } else if (query !== '') {
                if (this.isURL(query)) {
                    let url = `https://${query}`;
                    window.location.href = url;
                    this.storeQuery(url, query);
                } else {
                    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                    window.location.href = searchUrl;
                    this.storeQuery(searchUrl, query);
                }
            }


        }
    };



    storeQuery(url, query) {
        const storedQueries = localStorage.getItem('queries');
        let queries = {};
        if (storedQueries) {
            queries = JSON.parse(storedQueries);
        }

        const shortenedQuery = query.substring(0, 20);
        queries[url] = shortenedQuery;

        localStorage.setItem('queries', JSON.stringify(queries));
    }

    isURL(str) {
        return (str.includes(".")); // crude check
    }
}