

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const wordDetail = document.getElementById('wordDetail');
    const wordTitle = document.getElementById('wordTitle');
    const phonetic = document.getElementById('phonetic');
    const definition = document.getElementById('definition');
    const examples = document.getElementById('examples');
    const relatedWords = document.getElementById('relatedWords');
    const pronunciationButton = document.getElementById('pronunciationButton');
    const trendingWords = document.getElementById('trendingWords');
    const darkModeToggle = document.getElementById('darkModeToggle');

    const dictionaryApi = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

    searchButton.addEventListener('click', searchWord);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWord();
        }
    });

    async function searchWord() {
        const word = searchInput.value.trim();
        if (word) {
            try {
                const response = await axios.get(dictionaryApi + word);
                displayWordDetails(response.data[0]);
            } catch (error) {
                console.error('Error fetching word data:', error);
                alert('Word not found. Please try another word.');
            }
        }
    }

    function displayWordDetails(data) {
        wordTitle.textContent = data.word;
        phonetic.textContent = data.phonetic || '';
        definition.textContent = data.meanings[0].definitions[0].definition;

        examples.innerHTML = '';
        if (data.meanings[0].definitions[0].example) {
            const li = document.createElement('li');
            li.textContent = data.meanings[0].definitions[0].example;
            examples.appendChild(li);
        }

        relatedWords.innerHTML = '';
        if (data.meanings[0].synonyms) {
            data.meanings[0].synonyms.slice(0, 5).forEach(synonym => {
                const span = document.createElement('span');
                span.textContent = synonym;
                span.classList.add('related-word');
                relatedWords.appendChild(span);
            });
        }

        wordDetail.style.display = 'block';
        wordDetail.classList.add('fade-in');
    }

    pronunciationButton.addEventListener('click', () => {
        const audio = new Audio(data.phonetics[0].audio);
        audio.play();
    });

    // Simulated trending words
    const trending = ['Serendipity', 'Ephemeral', 'Eloquent', 'Resilience', 'Mellifluous'];
    trending.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        li.classList.add('cursor-pointer', 'hover:text-primary-color');
        li.addEventListener('click', () => {
            searchInput.value = word;
            searchWord();
        });
        trendingWords.appendChild(li);
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Background animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
