import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";


interface IAuthContext {
    userId: string;
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
    id: string;
    email: string;
    role: 'Reader' | 'Author';
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<IUser>({ id: '0', email: 'example@mail.ru', role: 'Reader' });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<IUser>(token);
                setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
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
        if (token) {
            try {
                const decoded = jwtDecode<IUser>(token);
                setUser({
                    id: decoded.id,
                    email: decoded.email,
                    role: decoded.role,
                });
                setIsAuthenticated(true);
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
        setUser({ id: '0', email: 'example@mail.ru', role: 'Reader' });
        setIsAuthenticated(false);
    };

    const register = () => {
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ userId: user.id, role: user.role, email: user.email, isAuthenticated, isLoading, login, logout, register }}>
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
