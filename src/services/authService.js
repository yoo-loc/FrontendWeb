// src/services/authService.js

// Mock user credentials
const mockUserSession = {
    isLoggedIn: false,
    userData: {
        username: "a",
        password: "a", 
        email: "a",
        name: "a"
    }
};

// Function to check if the user is logged in
export const isLoggedIn = () => {
    return mockUserSession.isLoggedIn;
};

// Function to get user data
export const getUserData = () => {
    return mockUserSession.isLoggedIn ? mockUserSession.userData : null;
};

// Function to log in with username and password
export const login = (username, password) => {
    if (
        username === mockUserSession.userData.username &&
        password === mockUserSession.userData.password
    ) {
        mockUserSession.isLoggedIn = true;
        return { success: true, userData: mockUserSession.userData };
    } else {
        return { success: false, message: "Invalid username or password" };
    }
};

// Function to log out the user
export const logout = () => {
    mockUserSession.isLoggedIn = false;
};
