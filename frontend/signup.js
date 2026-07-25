async function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const alertBox = document.getElementById("signup-alert");

    // Basic client-side validation
    if (!name || !email || !password) {
        alertBox.textContent = "Please fill in all fields.";
        alertBox.className = "signup-alert error";
        alertBox.style.display = "block";
        return;
    }

    if (password.length < 6) {
        alertBox.textContent = "Password must be at least 6 characters.";
        alertBox.className = "signup-alert error";
        alertBox.style.display = "block";
        return;
    }

    const btn = document.getElementById("btn-signup");
    btn.textContent = "Creating account...";

    try {
        const res = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (data.id) {
            alertBox.textContent = "Account created! Redirecting to login...";
            alertBox.className = "signup-alert success";
            alertBox.style.display = "block";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            alertBox.textContent = data.msg || "Signup failed. Please try again.";
            alertBox.className = "signup-alert error";
            alertBox.style.display = "block";
            btn.textContent = "Create Account";
        }
    } catch (err) {
        alertBox.textContent = "Could not connect to server.";
        alertBox.className = "signup-alert error";
        alertBox.style.display = "block";
        btn.textContent = "Create Account";
    }
}
