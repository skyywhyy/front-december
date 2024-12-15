import LoginForm from "@/pages/Auth/LoginForm.tsx";
import {FC, useState} from "react";
import RegForm from "@/pages/Auth/RegForm.tsx";


const AuthPage: FC = () => {
    const [isLogin, setIsLogin] = useState(true); // true для формы входа, false для регистрации
    return (
        <>
            {isLogin ? (
                <LoginForm switchToRegister={() => setIsLogin(false)} />
            ) : (
                <RegForm switchToLogin={() => setIsLogin(true)} />
            )}
        </>
    );
};

export default AuthPage;