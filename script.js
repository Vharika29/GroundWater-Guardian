let currentPage = 'home';
let userProfile = { name: '', overallScore: 0, completedLevels: [] }; 
let currentQuizLevel = 0;
let levelScore = 0;
let currentQuestionIndex = 0;
let isDarkMode = false;
let isProcessingAnswer = false; 
let shuffledQuizQuestions = [];
let lives = 3;

let timeLeft = 15;
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const appContent = document.getElementById('app-content');
const mainHeader = document.getElementById('main-header');
const profileArea = document.getElementById('profile-area');
const darkModeToggle = document.getElementById('dark-mode-toggle');

function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    updateHeaderProfile();
}

function loadUserProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        userProfile = {
            name: parsedProfile.name || '',
            overallScore: parsedProfile.overallScore || 0,
            completedLevels: Array.isArray(parsedProfile.completedLevels) ? parsedProfile.completedLevels : []
        };
    }
    updateHeaderProfile();
}


function updateHeaderProfile() {
    if (userProfile.name) {
        profileArea.innerHTML = `
            <div class="relative">
                <button id="profile-dropdown-toggle" class="flex items-center text-lg font-semibold px-3 py-2 rounded-full ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-white hover:bg-blue-700'} transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Hello, ${userProfile.name}!
                </button>
                <div id="profile-dropdown-menu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl py-1 z-20 hidden">
                    <button id="view-dashboard-button-dropdown" class="block w-full text-left px-4 py-2 text-blue-700 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200">
                        View Dashboard
                    </button>
                    <button id="logout-button-dropdown" class="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200">
                        Logout
                    </button>
                </div>
            </div>
        `;
        const profileDropdownToggle = document.getElementById('profile-dropdown-toggle');
        const profileDropdownMenu = document.getElementById('profile-dropdown-menu');

        profileDropdownToggle.onclick = (event) => {
            event.stopPropagation();
            profileDropdownMenu.classList.toggle('hidden');
        };

        document.addEventListener('click', (event) => {
            if (profileDropdownMenu && !profileDropdownMenu.contains(event.target) && !profileDropdownToggle.contains(event.target)) {
                profileDropdownMenu.classList.add('hidden');
            }
        });

        document.getElementById('logout-button-dropdown').onclick = () => {
            userProfile = { name: '', overallScore: 0, completedLevels: [] }; 
            saveUserProfile();
            setPage('home');
        };

        document.getElementById('view-dashboard-button-dropdown').onclick = () => {
            profileDropdownMenu.classList.add('hidden');
            setPage('dashboard');
        };

    } else {
        profileArea.innerHTML = `
            <button id="create-profile-button" class="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition-all duration-300 shadow-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Create Profile
            </button>
        `;
        document.getElementById('create-profile-button').onclick = () => setPage('dashboard');
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('isDarkMode', isDarkMode);
    updateHeaderProfile();
    darkModeToggle.innerHTML = isDarkMode ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400">
            <circle cx="12" cy="12" r="6"/><path d="M12 2v2m0 16v2m8-8h2M2 12h2m14.8-6.8l-1.4 1.4M6.8 17.2l-1.4 1.4m10.4 0l1.4-1.4M6.8 6.8L5.4 5.4"/>
        </svg>
    ` : `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-gray-900">
            <path d="M21 12.79A9 9 0 1 1 11.21 3.51a.75.75 0 0 1 .15.89c.17.36.43.68.74.92A6.5 6.5 0 0 0 15 13a6.5 6.5 0 0 0 6-6.5z"/>
        </svg>
    `;

    if (isDarkMode) {
        mainHeader.classList.remove('from-blue-600', 'to-cyan-500');
        mainHeader.classList.add('bg-gray-800', 'text-white');
    } else {
        mainHeader.classList.remove('bg-gray-800', 'text-white');
        mainHeader.classList.add('from-blue-600', 'to-cyan-500');
    }
}

function initDarkMode() {
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark');
        mainHeader.classList.remove('from-blue-600', 'to-cyan-500');
        mainHeader.classList.add('bg-gray-800', 'text-white');
    } else {
        isDarkMode = false;
        document.body.classList.remove('dark');
    }
    darkModeToggle.innerHTML = isDarkMode ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400">
            <circle cx="12" cy="12" r="6"/><path d="M12 2v2m0 16v2m8-8h2M2 12h2m14.8-6.8l-1.4 1.4M6.8 17.2l-1.4 1.4m10.4 0l1.4-1.4M6.8 6.8L5.4 5.4"/>
        </svg>
    ` : `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-gray-900">
            <path d="M21 12.79A9 9 0 1 1 11.21 3.51a.75.75 0 0 1 .15.89c.17.36.43.68.74.92A6.5 6.5 0 0 0 15 13a6.5 6.5 0 0 0 6-6.5z"/>
        </svg>
    `;
}

function renderHomePage() {
    const allLevelsCompleted = userProfile.completedLevels.length === window.quizData.length;

    appContent.innerHTML = `
        <div class="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 text-center ${userProfile.name ? '' : 'sm:pt-20'} ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gradient-to-br from-blue-100 to-green-100'} transition-colors duration-300">
            ${userProfile.name ? `
            <div class="absolute top-4 left-4 z-10 animate-fade-in">
                <button id="overall-score-button" class="bg-purple-600 text-white px-4 py-2 rounded-full text-base hover:bg-purple-700 transition-all duration-300 shadow-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                    </svg>
                    Your Score: ${userProfile.overallScore}
                </button>
            </div>` : ''}

            <div class="flex flex-col items-center justify-center mb-8 animate-fade-in">
                <img src="water image.png">
                <h2 class="text-4xl font-extrabold mb-6 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}">
                    Welcome ${userProfile.name ? `, ${userProfile.name}!` : '!'}
                </h2>
            </div>
            <p class="text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-10 max-w-2xl animate-fade-in-down">
                Embark on a journey to become a Groundwater Guardian! Test your knowledge and learn how to protect our most vital hidden resource.
            </p>
            <div class="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 animate-fade-in-down">
                <button id="start-quiz-button" class="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-2xl hover:bg-green-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3">
                        <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                    </svg>
                    ${allLevelsCompleted ? 'Restart Game' : 'Start Quiz'}
                </button>
                <button id="learn-about-it-button" class="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                    </svg>
                    Learn About It
                </button>
            </div>
            ${allLevelsCompleted && userProfile.name ? `
            <button id="reset-game-button" class="px-6 py-3 rounded-full font-bold text-lg shadow-md mt-8 flex items-center justify-center mx-auto
                               ${isDarkMode ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'} transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
                Reset All Progress
            </button>` : ''}
        </div>
    `;

    document.getElementById('start-quiz-button').onclick = () => {
        if (!userProfile.name) {
            alert("Please create a profile first to start the quiz!");
            setPage('dashboard');
            return;
        }

        const nextUncompletedLevelIndex = window.quizData.findIndex((_, index) =>
            !userProfile.completedLevels.includes(index)
        );

        if (nextUncompletedLevelIndex !== -1) {
            currentQuizLevel = nextUncompletedLevelIndex;
            levelScore = 0;
            currentQuestionIndex = 0;
            lives = 3; 
            setPage('quiz');
        } else {
            alert("You have completed all levels! You can view your overall score or reset the game to play again.");
            setPage('overall-score');
        }
    };

    document.getElementById('learn-about-it-button').onclick = () => setPage('learn');
    if (userProfile.name) {
        document.getElementById('overall-score-button').onclick = () => setPage('overall-score');
    }
    if (allLevelsCompleted && userProfile.name) {
        document.getElementById('reset-game-button').onclick = () => {
            if (confirm("Are you sure you want to reset all game progress? Your score and completed levels will be cleared.")) {
                userProfile.overallScore = 0;
                userProfile.completedLevels = [];
                saveUserProfile();
                setPage('home'); 
            }
        };
    }
}

function renderDashboardPage() {
    appContent.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300">
            <div class="p-8 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'} animate-fade-in">
                <h2 class="text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}">Your Dashboard</h2>
                <form id="profile-form" class="flex flex-col space-y-4">
                    <label for="name-input" class="text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}">Your Name:</label>
                    <input
                        type="text"
                        id="name-input"
                        value="${userProfile.name}"
                        class="px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'border-gray-300 text-gray-900'}"
                        placeholder="Enter your name"
                        required
                    />
                    <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                        Save Profile
                    </button>
                    <button type="button" id="back-to-home-from-profile" class="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-400 transition-colors duration-300 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                        Back to Home
                    </button>
                    ${userProfile.name ? `
                    <button type="button" id="logout-button" class="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors duration-300 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M10 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/><path d="M17 16l4-4-4-4"/><path d="M21 12H9"/>
                        </svg>
                        Logout
                    </button>` : ''}
                </form>
            </div>
        </div>
    `;
    document.getElementById('profile-form').onsubmit = (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name-input').value.trim();
        if (nameInput) {
            userProfile.name = nameInput;
            saveUserProfile();
            setPage('home');
        } else {
            alert("Please enter a valid name.");
        }
    };
    document.getElementById('back-to-home-from-profile').onclick = () => setPage('home');
    if (userProfile.name) {
        document.getElementById('logout-button').onclick = () => {
            userProfile = { name: '', overallScore: 0, completedLevels: [] };
            saveUserProfile();
            setPage('home');
        };
    }
}

function renderLearnPage() {
    appContent.innerHTML = `
        <div class="flex flex-col items-center min-h-[calc(100vh-8rem)] p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-blue-50'} overflow-auto transition-colors duration-300">
            <div class="p-8 rounded-lg shadow-xl max-w-3xl w-full ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'} animate-fade-in">
                <h2 class="text-4xl font-extrabold mb-6 text-center ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}">Understanding Groundwater</h2>

                <section class="mb-8">
                    <h3 class="text-2xl font-bold mb-3 flex items-center ${isDarkMode ? 'text-green-300' : 'text-green-700'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                        What is Groundwater?
                    </h3>
                    <p class="text-gray-700 ${isDarkMode ? 'dark:text-gray-300' : ''} leading-relaxed text-lg">
                        Groundwater is water located beneath the Earth's surface, in soil pore spaces and in the fractures of rock formations. A unit of rock or an unconsolidated deposit is called an <strong class="${isDarkMode ? 'text-green-400' : 'text-green-600'}">aquifer</strong> when it can yield a usable quantity of water to a well or spring. It's a vital part of the water cycle, slowly moving through the ground.
                    </p>
                </section>

                <section class="mb-8">
                    <h3 class="text-2xl font-bold mb-3 flex items-center ${isDarkMode ? 'text-green-300' : 'text-green-700'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                        </svg>
                        Why is it Important?
                    </h3>
                    <ul class="list-disc list-inside text-gray-700 ${isDarkMode ? 'dark:text-gray-300' : ''} leading-relaxed text-lg space-y-2">
                        <li><strong class="${isDarkMode ? 'text-blue-400' : 'text-blue-600'}">Drinking Water:</strong> Half of the world's population relies on groundwater for drinking.</li>
                        <li><strong class="${isDarkMode ? 'text-blue-400' : 'text-blue-600'}">Agriculture:</strong> It's crucial for irrigating crops, especially in arid regions.</li>
                        <li><strong class="${isDarkMode ? 'text-blue-400' : 'text-blue-600'}">Ecosystems:</strong> Groundwater sustains rivers, lakes, and wetlands, supporting diverse ecosystems.</li>
                        <li><strong class="${isDarkMode ? 'text-blue-400' : 'text-blue-600'}">Drought Resilience:</strong> It acts as a buffer during dry periods when surface water sources diminish.</li>
                    </ul>
                </section>

                <section class="mb-8">
                    <h3 class="text-2xl font-bold mb-3 flex items-center ${isDarkMode ? 'text-green-300' : 'text-green-700'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                        Threats to Groundwater
                    </h3>
                    <p class="text-gray-700 ${isDarkMode ? 'dark:text-gray-300' : ''} leading-relaxed text-lg mb-4">
                        Groundwater faces significant threats that jeopardize its availability and quality:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 ${isDarkMode ? 'dark:text-gray-300' : ''} leading-relaxed text-lg space-y-2">
                        <li><strong class="${isDarkMode ? 'text-red-400' : 'text-red-600'}">Over-pumping (Depletion):</strong> Extracting water faster than it can be naturally replenished leads to falling water tables, dry wells, and land subsidence.</li>
                        <li><strong class="${isDarkMode ? 'text-red-400' : 'text-red-600'}">Pollution:</strong> Contaminants from industrial waste, agricultural runoff (pesticides, fertilizers), leaky septic systems, and landfills can seep into aquifers, making the water unsafe.</li>
                        <li><strong class="${isDarkMode ? 'text-red-400' : 'text-red-600'}">Climate Change:</strong> Changes in rainfall patterns can reduce groundwater recharge, exacerbating depletion.</li>
                    </ul>
                </section>

                <section class="mb-8">
                    <h3 class="text-2xl font-bold mb-3 flex items-center ${isDarkMode ? 'text-green-300' : 'text-green-700'}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                        Groundwater Conservation Methods
                    </h3>
                    <p class="text-gray-700 ${isDarkMode ? 'dark:text-gray-300' : ''} leading-relaxed text-lg mb-4">
                        We can all contribute to protecting groundwater through various practices:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 ${isDarkMode ? 'dark:text-gray-300' : ''} leading-relaxed text-lg space-y-2">
                        <li><strong class="${isDarkMode ? 'text-purple-300' : 'text-purple-600'}">Rainwater Harvesting:</strong> Collecting and storing rainwater to recharge aquifers or for direct use, reducing reliance on groundwater.</li>
                        <li><strong class="${isDarkMode ? 'text-purple-300' : 'text-purple-600'}">Efficient Irrigation:</strong> Adopting methods like drip irrigation and sprinklers to minimize water waste in agriculture.</li>
                        <li><strong class="${isDarkMode ? 'text-purple-300' : 'text-purple-600'}">Pollution Prevention:</strong> Proper disposal of hazardous waste, reducing reliance on chemical fertilizers, and improving wastewater treatment.</li>
                        <li><strong class="${isDarkMode ? 'text-purple-300' : 'text-purple-600'}">Water-Efficient Appliances:</strong> Using appliances and fixtures that reduce water consumption in homes and businesses.</li>
                        <li><strong class="${isDarkMode ? 'text-purple-300' : 'text-purple-600'}">Public Awareness:</strong> Educating communities about the importance of groundwater and sustainable practices.</li>
                    </ul>
                </section>

                <button id="back-to-home-from-learn" class="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-xl hover:bg-blue-700 transition-colors duration-300 shadow-md mt-6 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    `;
    document.getElementById('back-to-home-from-learn').onclick = () => setPage('home');
}

function renderQuizPage() {
    clearInterval(timerInterval); 
    timeLeft = 15; 

    const currentLevelData = window.quizData[currentQuizLevel];
    const currentQuestion = shuffledQuizQuestions[currentQuestionIndex];
    const totalQuestionsInLevel = currentLevelData.questions.length;

    appContent.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-green-100'} transition-colors duration-300">
            <div class="p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'} animate-fade-in">
                <h2 class="text-3xl font-bold mb-4 text-center ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}">
                    Level ${currentLevelData.level}: ${currentLevelData.title}
                </h2>
                <div class="flex justify-between items-center mb-6">
                    <span class="text-xl font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}">
                        Question ${currentQuestionIndex + 1} of ${totalQuestionsInLevel}
                    </span>
                    <div class="flex items-center space-x-2">
                        <span class="text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}">Lives:</span>
                        ${[...Array(3)].map((_, i) => `
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="${i < lives ? (isDarkMode ? 'text-red-500' : 'text-red-600') : 'text-gray-400'}">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                            </svg>
                        `).join('')}
                    </div>
                </div>

                <!-- Timer Bar -->
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4 overflow-hidden">
                    <div id="timer-bar" class="bg-purple-500 h-full rounded-full transition-all ease-linear duration-1000"></div>
                </div>
                <div id="timer-text" class="text-center text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}">
                    Time Left: ${timeLeft}s
                </div>

                <div class="p-6 rounded-lg mb-4 border-l-4 ${isDarkMode ? 'bg-gray-600 border-blue-400' : 'bg-blue-50 border-blue-500'}">
                    <p class="text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}">${currentQuestion.question}</p>
                </div>

                <div id="options-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${currentQuestion.options.map((option, index) => `
                        <button
                            data-option="${option}"
                            class="${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-600'} text-white px-6 py-4 rounded-lg font-semibold text-lg
                                     transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95"
                        >
                            ${option}
                        </button>
                    `).join('')}
                </div>

                <div id="feedback-message" class="text-center font-bold text-lg mt-4 hidden animate-fade-in"></div>
                <button id="next-question-button" class="hidden bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md mt-4 flex items-center justify-center mx-auto animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                    Next Question
                </button>

                <button id="exit-quiz-button" class="px-6 py-3 rounded-full font-bold text-lg shadow-md mt-8 flex items-center justify-center mx-auto
                               ${isDarkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'} transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Exit Quiz
                </button>
            </div>
        </div>
    `;

    const optionsContainer = document.getElementById('options-container');
    const optionButtons = optionsContainer.querySelectorAll('button');
    const nextQuestionButton = document.getElementById('next-question-button');
    const timerBar = document.getElementById('timer-bar');
    const timerText = document.getElementById('timer-text');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = `Time Left: ${timeLeft}s`;
        timerBar.style.width = `${(timeLeft / 15) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswerClick(null, true); 
        }
    }, 1000);


    optionButtons.forEach(button => {
        button.onclick = (e) => handleAnswerClick(e.target.dataset.option);
    });

    nextQuestionButton.onclick = () => {
        clearInterval(timerInterval); 
        if (lives <= 0) {
            setPage('game-over');
            return;
        }

        if (currentQuestionIndex < currentLevelData.questions.length - 1) {
            currentQuestionIndex++;
            renderQuizPage();
        } else {
            
            setPage('score-slide');
        }
    };

    document.getElementById('exit-quiz-button').onclick = () => {
        clearInterval(timerInterval);
        setPage('home');
    };
}

function handleAnswerClick(selectedOption, timedOut = false) {
    if (isProcessingAnswer) return; 
    isProcessingAnswer = true;
    clearInterval(timerInterval);

    const currentLevelData = window.quizData[currentQuizLevel];
    const currentQuestion = shuffledQuizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const feedbackMessageDiv = document.getElementById('feedback-message');
    const nextQuestionButton = document.getElementById('next-question-button');


    const optionButtons = document.querySelectorAll('#options-container button');
    optionButtons.forEach(button => {
        const option = button.dataset.option;
        button.disabled = true; 
        button.classList.remove(
            'bg-green-500', 'hover:bg-green-600',
            'bg-blue-600', 'hover:bg-blue-700',
            'bg-gray-500', 'hover:bg-gray-600',
            'transform', 'hover:scale-105', 'active:scale-95'
        ); 

        if (option === currentQuestion.answer) {
            button.classList.add('bg-green-600', 'ring-4', 'ring-green-300'); 
        } else if (option === selectedOption && !isCorrect) {
            button.classList.add('bg-red-600', 'ring-4', 'ring-red-300');
        } else {
            button.classList.add(`${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`, 'opacity-70'); 
        }
    });

    feedbackMessageDiv.classList.remove('hidden');
    if (isCorrect) {
        feedbackMessageDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 inline-block">
                                        <path d="M20 6 9 17l-5-5"/>
                                    </svg>Correct! Well done.`;
        feedbackMessageDiv.classList.add('text-green-600');
        feedbackMessageDiv.classList.remove('text-red-600');
    } else {
        lives--; 
        feedbackMessageDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 inline-block">
                                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                                    </svg>Incorrect! The correct answer was: "<span class="font-extrabold">${currentQuestion.answer}</span>"`;
        feedbackMessageDiv.classList.add('text-red-600');
        feedbackMessageDiv.classList.remove('text-green-600');
    }

    const livesIcons = document.querySelectorAll('.flex.items-center.space-x-2 svg');
    livesIcons.forEach((icon, i) => {
        if (i >= lives) {
            icon.classList.add('text-gray-400');
            icon.classList.remove(isDarkMode ? 'text-red-500' : 'text-red-600');
        }
    });

    if (isCorrect) {
        levelScore++;
    }

    nextQuestionButton.classList.remove('hidden');
    isProcessingAnswer = false; 
}


function renderScoreSlide() {
    const currentLevelData = window.quizData[currentQuizLevel];
    const totalQuestionsInLevel = currentLevelData.questions.length;
    const isLastLevel = currentQuizLevel === window.quizData.length - 1;
    userProfile.overallScore += levelScore;
    if (!userProfile.completedLevels.includes(currentQuizLevel)) {
        userProfile.completedLevels.push(currentQuizLevel);
    }
    saveUserProfile(); 

    appContent.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-green-100'} transition-colors duration-300">
            <div class="p-8 rounded-lg shadow-xl w-full max-w-md text-center ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'} animate-fade-in">
                <h2 class="text-4xl font-bold mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}">Level ${currentLevelData.level} Complete!</h2>
                <p class="text-2xl mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}">
                    You scored <span class="font-extrabold text-green-600">${levelScore}</span> out of <span class="font-extrabold text-blue-600">${totalQuestionsInLevel}</span> questions!
                </p>

                ${userProfile.completedLevels.length < window.quizData.length ? `
                <button id="next-level-button" class="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                    Next Level
                </button>` : `
                <p class="text-3xl font-extrabold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-700'}">
                    Congratulations, Groundwater Guardian!
                </p>
                <p class="text-xl mb-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}">
                    You've completed all levels! Keep advocating for groundwater conservation.
                </p>
                <button id="finish-game-button" class="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:scale-105 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                    </svg>
                    View Overall Score
                </button>`}
                <button id="back-to-home-from-score" class="px-6 py-3 rounded-full font-bold text-lg shadow-md mt-4 flex items-center justify-center mx-auto
                               ${isDarkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'} transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    `;

    if (userProfile.completedLevels.length < window.quizData.length) {
        document.getElementById('next-level-button').onclick = () => {
            const nextUncompletedLevelIndex = window.quizData.findIndex((_, index) =>
                !userProfile.completedLevels.includes(index)
            );
            if (nextUncompletedLevelIndex !== -1) {
                currentQuizLevel = nextUncompletedLevelIndex;
                levelScore = 0;
                currentQuestionIndex = 0;
                lives = 3; 
                setPage('quiz');
            } else {
                setPage('overall-score'); 
            }
        };
    } else {
        document.getElementById('finish-game-button').onclick = () => {
            setPage('overall-score');
        };
    }
    document.getElementById('back-to-home-from-score').onclick = () => {
        currentQuizLevel = 0;
        levelScore = 0;
        currentQuestionIndex = 0;
        lives = 3;
        setPage('home');
    };
}


function renderOverallScorePage() {
    const allLevelsCompleted = userProfile.completedLevels.length === window.quizData.length;

    appContent.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-green-100'} transition-colors duration-300">
            <div class="p-8 rounded-lg shadow-xl w-full max-w-md text-center ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white'} animate-fade-in">
                <h2 class="text-4xl font-bold mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}">Your Overall Score</h2>
                ${userProfile.name ? `
                    <p class="text-2xl mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}">
                        Hello, <span class="font-extrabold text-blue-600">${userProfile.name}</span>!
                    </p>
                    <p class="text-3xl font-extrabold text-green-600 mb-8">
                        Total Score: ${userProfile.overallScore}
                    </p>` : `
                    <p class="text-xl mb-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}">
                        Please create a profile to see your score.
                    </p>`
                }
                ${allLevelsCompleted && userProfile.name ? `
                    <p class="text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
                        You've mastered all levels! Ready to play again?
                    </p>
                    <button id="reset-game-button" class="bg-green-600 text-white px-6 py-3 rounded-full font-bold text-xl hover:bg-green-700 transition-all duration-300 shadow-md flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="M10 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"/><path d="M17 16l4-4-4-4"/><path d="M21 12H9"/>
                        </svg>
                        Play Again (Reset All Progress)
                    </button>
                    <button id="back-to-home-from-score" class="px-6 py-3 rounded-full font-bold text-lg shadow-md mt-4 flex items-center justify-center mx-auto
                               ${isDarkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'} transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                        Back to Home
                    </button>` : `
                    <button id="back-to-home-from-score" class="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-xl hover:bg-blue-700 transition-all duration-300 shadow-md flex items-center justify-center mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                        Back to Home
                    </button>
                `}
            </div>
        </div>
    `;
    document.getElementById('back-to-home-from-score').onclick = () => setPage('home');
    if (allLevelsCompleted && userProfile.name) {
        document.getElementById('reset-game-button').onclick = () => {
            if (confirm("Are you sure you want to reset all game progress? Your score and completed levels will be cleared.")) {
                userProfile.overallScore = 0;
                userProfile.completedLevels = [];
                saveUserProfile();
                setPage('home'); 
            }
        };
    }
}


function renderGameOverPage() {
    appContent.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-red-100'} transition-colors duration-300">
            <div class="p-8 rounded-lg shadow-xl w-full max-w-md text-center ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'} animate-fade-in">
                <h2 class="text-5xl font-extrabold mb-4 text-red-600">GAME OVER!</h2>
                <p class="text-2xl mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}">
                    ${userProfile.name ? `Sorry, ${userProfile.name}. ` : ''}You ran out of lives.
                </p>
                <p class="text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}">
                    Don't worry, you can always try again to become a Groundwater Guardian!
                </p>
                <button id="play-again-button" class="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-green-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11"/>
                    </svg>
                    Play Again
                </button>
                <button id="back-to-home-from-gameover" class="px-6 py-3 rounded-full font-bold text-lg shadow-md mt-4 flex items-center justify-center mx-auto
                               ${isDarkMode ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'} transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    `;

    document.getElementById('play-again-button').onclick = () => {
        currentQuizLevel = 0;
        levelScore = 0;
        currentQuestionIndex = 0;
        lives = 3;
        setPage('quiz');
    };
    document.getElementById('back-to-home-from-gameover').onclick = () => {
        currentQuizLevel = 0;
        levelScore = 0;
        currentQuestionIndex = 0;
        lives = 3;
        setPage('home');
    };
}


function setPage(pageName) {
    currentPage = pageName;
    clearInterval(timerInterval);
    switch (currentPage) {
        case 'home':
            renderHomePage();
            break;
        case 'dashboard':
            renderDashboardPage();
            break;
        case 'learn':
            renderLearnPage();
            break;
        case 'quiz':
            if (currentQuestionIndex === 0) {
                 shuffledQuizQuestions = [...window.quizData[currentQuizLevel].questions];
                 shuffleArray(shuffledQuizQuestions);
            }
            renderQuizPage();
            break;
        case 'score-slide':
            renderScoreSlide();
            break;
        case 'overall-score':
            renderOverallScorePage();
            break;
        case 'game-over':
            renderGameOverPage();
            break;
        default:
            renderHomePage();
    }
}

window.onload = function() {
    loadUserProfile();
    initDarkMode();
    setPage(currentPage);

    darkModeToggle.onclick = toggleDarkMode;
};
