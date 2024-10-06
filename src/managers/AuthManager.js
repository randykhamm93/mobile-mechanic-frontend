// src/managers/AuthManager.js

const API_URL = 'http://localhost:8000/api'; // Ensure this is correct

// Function to handle login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Invalid credentials');
    }

    const data = await response.json();
    // Store tokens in localStorage
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return { success: true, message: 'Login successful!' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.message };
  }
};

// Function to handle registration
export const register = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: error.message };
  }
};

// Function to handle logout
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
