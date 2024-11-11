// Toggle between login and registration forms
document.getElementById("go-to-register").addEventListener("click", function (e) {
    e.preventDefault();
    showRegisterForm();
});

document.getElementById("go-to-login").addEventListener("click", function (e) {
    e.preventDefault();
    showLoginForm();
});

// Show login form
function showLoginForm() {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("register-box").style.display = "none";
}

// Show registration form
function showRegisterForm() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
}

// Login form submit event
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields!");
        return;
    }

    // Fetch user data from JSON server
    fetch("http://localhost:4000/user")
        .then(response => response.json())
        .then(data => {
            const user = data.find(u => u.username === username && u.password === password);

            if (user) {
                alert("Login Successful");
                // Redirect to index.html after successful login
                window.location.href = "index.html";
            } else {
                alert("Invalid Username or Password");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Error connecting to the server");
        });
});

// Registration form submit event
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var username = document.getElementById("register-username").value;
    var email = document.getElementById("register-email").value;
    var mobile = document.getElementById("register-mob").value;
    var password = document.getElementById("register-password").value;
    var confirmPassword = document.getElementById("register-cpassword").value;

    if (username === "" || email === "" || mobile === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check if the user already exists
    fetch("http://localhost:4000/user")
        .then(response => response.json())
        .then(data => {
            const existingUser = data.find(u => u.username === username);

            if (existingUser) {
                alert("Username already exists! Please choose another.");
            } else {
                // Register the new user by sending a POST request
                fetch("http://localhost:4000/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: username, email: email, mobile: mobile, password: password })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Registration successful! You can now log in.");
                    // Redirect to login page after registration
                    showLoginForm();
                })
                .catch(error => {
                    console.error("Error during registration:", error);
                    alert("Error registering user");
                });
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Error connecting to the server");
        });
});

// Forgot password functionality
document.querySelector(".remember-me a").addEventListener("click", function (e) {
    e.preventDefault();
    const email = prompt("Please enter your email address to receive a password reset link:");

    if (email) {
        // Simulate sending a reset password link
        alert(`A password reset link has been sent to ${email}.`);
    }
});
