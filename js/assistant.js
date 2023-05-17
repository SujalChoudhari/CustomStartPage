class Assistant {
    constructor() {
        this.greetings = {
            morning: 'Good morning',
            afternoon: 'Good afternoon',
            evening: 'Good evening',
            night: 'Good night'
        };
        this.assistantContainer = document.getElementById('assistantContainer');
        this.assistantHeader = document.getElementById('assistantHeader');
        this.assistantContent = document.getElementById('assistantContent');
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    getGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            return this.greetings.morning;
        } else if (currentHour >= 12 && currentHour < 17) {
            return this.greetings.afternoon;
        } else if (currentHour >= 17 && currentHour < 20) {
            return this.greetings.evening;
        } else {
            return this.greetings.night;
        }
    }

    fetchLatestNewsArticle() {
        const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        this.updateAssistantContent('Fetching latest news...');

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const latestNewsId = data[Math.floor(Math.random() * data.length)];
                const newsUrl = `https://hacker-news.firebaseio.com/v0/item/${latestNewsId}.json`;
                return fetch(newsUrl);
            })
            .then(response => response.json())
            .then(data => {
                const { title, by, score } = data;

                let response = `"${title}" by ${by}`;
                this.updateAssistantContent(response);
                if (data.text) {
                    const textElement = document.createElement('p');
                    textElement.innerHTML = data.text;
                    this.assistantContent.appendChild(textElement);
                }

                if (data.url) {
                    let link = document.createElement('a');
                    link.href = data.url;
                    link.textContent = "[Read More]";
                    this.assistantContent.appendChild(document.createElement('br'));
                    this.assistantContent.appendChild(link);
                }
            })
            .catch(error => {
                const response = 'Failed to fetch news. Please try again later.';
                this.updateAssistantContent(response);
            });
    }

    processQuery(query) {
        query = query.toLowerCase();
        let response = '';

        if (query.includes('time')) {
            const currentTime = this.getCurrentTime();
            response = `The current time is ${currentTime}.`;
        } else if (query.includes('news')) {
            this.fetchLatestNewsArticle();
            return;
        } else {
            response = "You want me to search for that?";
        }

        return response;
    }

    updateAssistantContent(content) {
        this.assistantContent.textContent = content;
    }

    greetUser() {
        const greeting = this.getGreeting();
        this.assistantHeader.textContent = `${greeting}, Sujal!`;

        // show latest news
        this.fetchLatestNewsArticle();
    }

    communicate(query) {
        const response = this.processQuery(query);
        this.updateAssistantContent(response);
    }
}
