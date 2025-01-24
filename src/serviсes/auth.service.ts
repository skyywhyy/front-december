export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}
export interface RegisterPayload {
    email: string;
    password: string;
    role: string;
}

export async function loginService(payload: LoginPayload): Promise<LoginResponse> {
    const API_URL = "https://cpt-stage-2.duckdns.org/api/auth/login";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 403) {
                throw new Error(errorData.error || "Неверный логин или пароль");
            }
            throw new Error(errorData.message || "Ошибка при авторизации");

        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка сети или сервера:", error);
        throw error;
    }
}
export async function registerService(payload: RegisterPayload): Promise<{ accessToken: string; refreshToken: string }> {
    const API_URL = "https://cpt-stage-2.duckdns.org/api/auth/register";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 400) {
                throw new Error(errorData.error || "Данный email уже занят");
            }
            throw new Error(errorData.error || "Ошибка при регистрации");
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error;
    }
}