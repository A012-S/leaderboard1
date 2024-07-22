// script.js

// Array to store player data
let players = [];

// Function to add a player
function addPlayer() {
    const playerNameInput = document.getElementById('playerName');
    const playerScoreInput = document.getElementById('playerScore');
    const playerName = playerNameInput.value.trim();
    const playerScore = parseInt(playerScoreInput.value);

    // Validate input
    if (!playerName) {
        alert('Please enter a player name.');
        return;
    }

    if (!isNaN(playerName)) {
        alert('Player name must be a string.');
        return;
    }

    if (isNaN(playerScore)) {
        alert('Score must be a number.');
        return;
    }

    // Add player to array
    players.push({ name: playerName, score: playerScore });
    playerNameInput.value = '';
    playerScoreInput.value = '';
    updateLeaderboard();
}

// Function to update the leaderboard
function updateLeaderboard() {
    // Sort players by score in descending order
    players.sort((a, b) => b.score - a.score);

    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    // Display the sorted players
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${player.name}</span><span>${player.score}</span><button class="delete-btn" onclick="deletePlayer(${index})">Delete</button>`;
        leaderboardList.appendChild(li);
    });

    // Update stats
    updateStats();
}

// Function to delete a player
function deletePlayer(index) {
    players.splice(index, 1);
    updateLeaderboard();
}

// Function to update stats
function updateStats() {
    const statsSection = document.querySelector('.stats');
    const labelsSection = statsSection.querySelectorAll('p');

    if (players.length < 2) {
        statsSection.style.display = 'none';
        document.getElementById('winnerMessage').textContent = '';
        return;
    }

    statsSection.style.display = 'block';

    const scores = players.map(player => player.score);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const avgScore = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2);
    const maxPlayer = players.find(player => player.score === maxScore).name;
    const minPlayer = players.find(player => player.score === minScore).name;

    document.getElementById('maxScore').textContent = maxScore;
    document.getElementById('minScore').textContent = minScore;
    document.getElementById('avgScore').textContent = avgScore;
    document.getElementById('maxPlayer').textContent = maxPlayer;
    document.getElementById('minPlayer').textContent = minPlayer;
    document.getElementById('winnerMessage').textContent = `${maxPlayer} is the winner!`;
}
