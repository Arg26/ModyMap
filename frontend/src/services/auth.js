import api from "./api";

const TOKEN_KEY = "modymap_token";
const USER_KEY = "modymap_user";

/**
 * Login User
 */
export async function login(credentials) {
    const response = await api.post(
        "/auth/login",
        credentials
    );

    const { token, user } = response.data;

    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    if (user) {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );
    }

    return response.data;
}

/**
 * Register User
 */
export async function register(userData) {
    const response = await api.post(
        "/auth/register",
        userData
    );

    return response.data;
}

/**
 * Logout
 */
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

/**
 * Get Current User
 */
export function getCurrentUser() {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
}

/**
 * Get JWT Token
 */
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Is Logged In
 */
export function isAuthenticated() {
    return !!getToken();
}

/**
 * Authorization Header
 */
export function getAuthHeader() {
    const token = getToken();

    return token
        ? {
              Authorization: `Bearer ${token}`,
          }
        : {};
}