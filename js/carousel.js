class Carousel {
    commandInput = document.getElementById('commandInput');
    constructor() {
        this.sentences = Object.entries(DATA);
        this.currentIndex = 0;
        this.carouselInterval = null;
    }

    displayText() {
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = '';

        const endIndex = Math.min(this.currentIndex + 4, this.sentences.length);
        for (let i = this.currentIndex; i < endIndex; i++) {
            const [url, name] = this.sentences[i];

            const link = document.createElement('a');
            link.href = url;
            link.textContent = name;

            const listItem = document.createElement('li');
            listItem.appendChild(link);

            searchResultsContainer.appendChild(listItem);
        }
    }

    cycleText() {
        if (this.commandInput.value.length > 0) return;

        this.currentIndex += 4;
        if (this.currentIndex >= this.sentences.length) {
            this.currentIndex = 0;
        }
        this.displayText();
    }


    startCarousel() {
        this.displayText();
        this.carouselInterval = setInterval(this.cycleText.bind(this), 3000); // Change text every 3 seconds (adjust as needed)
    }

    stopCarousel() {
        clearInterval(this.carouselInterval);
    }
}
