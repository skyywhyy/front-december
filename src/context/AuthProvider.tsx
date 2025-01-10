import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";


interface IAuthContext {
    userId: number;
    role: string;
    email: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    register: () => void;
}

interface IAuthProvider {
    children: ReactNode;
}

interface IUser {
    id: number;
    email: string | null;
    role: 'Reader' | 'Author';
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<IUser>({ id: 0, email: 'example@mail.ru', role: 'Reader' });


    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token) {
            try {
                const decoded = jwtDecode<any>(token); //ебать токен если честно извините за мой французский
                setUser({ id: decoded.Id,
                    email: email,
                    role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],});
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
                logout(); // Очистить некорректный токен
            }
        } else {
            console.warn("Токен отсутствует. Перенаправление на страницу входа.");
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);


    // useEffect(() => {
    //         console.log("Пользователь обновлён:", user);
    // }, [user]);

    const login = () => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem('email');
        if (token) {
            try {
                const decoded = jwtDecode<any>(token);
                console.log("Декодированный токен:", decoded);
                setUser({ id: decoded.Id,
                    email: email,
                    role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],});
                setIsAuthenticated(true);
                setIsLoading(false);
            } catch (error) {
                console.error("Некорректный токен:", error);
                logout();
            }

        } else {
            console.error("Попытка логина без токена.");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        setUser({ id: 0, email: 'example@mail.ru', role: 'Reader' });
        setIsAuthenticated(false);
    };

    const register = () => {
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{
            userId: user.id,
            role: user.role,
            email: user.email ||"",
            isAuthenticated,
            isLoading,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth должен быть использован внутри AuthProvider');
    }
    return context;
};
