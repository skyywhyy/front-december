"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Label} from "@radix-ui/react-label";
import {useAuth} from "@/context/AuthProvider.tsx";
import {loginService} from "@/pages/Auth/servises/auth.service.ts";
import {useState} from "react";

const formSchema = z.object({
    email: z.string().min(2, "Введите корректный email").max(50),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов").max(50)
})


const LoginForm = ({ switchToRegister }: { switchToRegister: () => void }) => {
    const {login} = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { refreshToken, accessToken } = await loginService(values);
            if(refreshToken && accessToken){
                localStorage.setItem("token", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("email", values.email);
                login();
            }

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message || "Ошибка при авторизации");
            } else {
                setErrorMessage("Неизвестная ошибка");
            }
        }
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-50">
            <div className="flex flex-col gap-4 bg-white rounded-xl w-[416px] p-4">
                <Label className="text-xl font-semibold">
                   Войти
                </Label>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Почта</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Введите почту" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Введите пароль" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {errorMessage && (
                            <div style={{ color: "red", marginTop: "10px" }}>
                                {errorMessage}
                            </div>
                        )}
                        <Button className="w-full" type="submit">Войти</Button>
                    </form>
                </Form>
                <Label>
                    Нет аккаунта? <span  onClick={switchToRegister} className="text-indigo-500 hover:text-indigo-300">Создать аккаунт</span>
                </Label>
            </div>
        </div>
    );
};



export default LoginForm;