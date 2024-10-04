let user;
console.log(user);

function adduserTitle(user){
    const userTitle = document.getElementById('userTitle')
    userTitle.innerText = `Hi ${user}`;
}

function saveprofile() {
    const diseases = document.getElementById('diseases');
    const allergies = document.getElementById('allergies');
    const weight = document.getElementById('weight');
    
    const profile = {
        "diseases": diseases.value,
        "allergies": allergies.value,
        "weight": weight.value
    };
    console.log(profile);
    localStorage.setItem('profile', JSON.stringify(profile));
    window.location.href='index.html';
}
function saveuser() {
    const username = document.getElementById('username').value;
    user = username;
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
}

// User authentication and profile management
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username]) {
        alert('Username already exists. Please choose a different one.');
        return;
    }
    
    users[username] = { password: password, profile: {} };
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = { username: username, profile: {} };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    window.location.href = 'personalize.html';
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let users = JSON.parse(localStorage.getItem('users')) || {};
    
    if (users[username] && users[username].password === password) {
        currentUser = { username: username, profile: users[username].profile };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = 'login.html';
}

function saveProfile() {
    const diseases = document.getElementById('diseases').value;
    const allergies = document.getElementById('allergies').value;
    const weight = document.getElementById('weight').value;
    
    currentUser.profile = {
        diseases: diseases,
        allergies: allergies,
        weight: weight
    };
    
    let users = JSON.parse(localStorage.getItem('users'));
    users[currentUser.username].profile = currentUser.profile;
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    window.location.href = 'index.html';
}

function displayUserProfile() {
    if (currentUser) {
        const profileDiv = document.getElementById('userProfile');
        profileDiv.innerHTML = `
            <h3>Welcome, ${currentUser.username}!</h3>
            <p>Diseases: ${currentUser.profile.diseases || 'None'}</p>
            <p>Allergies: ${currentUser.profile.allergies || 'None'}</p>
            <p>Weight: ${currentUser.profile.weight || 'Not specified'} kg</p>
        `;
    } else {
        window.location.href = 'login.html';
    }
}

