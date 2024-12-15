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

const formSchema = z.object({
    email: z.string().min(2, "Введите корректный email").max(50),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов").max(50)
})


const LoginForm = ({ switchToRegister }: { switchToRegister: () => void }) => {
    const {login} = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:""
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Логика авторизации
        if (values.email === "denchikdog3@gmail.com" && values.password === "111111") {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxNjU5MTMyLWNjYWMtNDVlYy1hY2UzLTQ4NjU0YTE4M2ZjYiIsInJvbGUiOiJSZWFkZXIiLCJlbWFpbCI6ImRlbmNoaWtkb2czQGdtYWlsLmNvbSIsImlhdCI6MTczNDIwOTA2NywiZXhwIjoxNzM0MjE2MjY3fQ.xyy9f669aIzR1XnzVWxKuKQ47k-HKraVQTjA7dzqJ-I";
            localStorage.setItem("token", token);
            login();
        }
        else if (values.email ==="denchikgod3@gmail.com" && values.password ==="111111"){
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1YWUxM2E5LTM2YTktNGJlNS1iN2Y3LWFhNWUzZTVhMzgyMiIsInJvbGUiOiJBdXRob3IiLCJlbWFpbCI6ImRlbmNoaWtnb2QzQGdtYWlsLmNvbSIsImlhdCI6MTczNDE3NjQ1NSwiZXhwIjoxNzM0MTgzNjU1fQ.9iNBmBYXbRr09xZ5cFt4Gbc7N0PAUS2Z1r_mpZHA1Do";
            localStorage.setItem("token",token);
            login();
        }
        else {
            alert("Неверный логин или пароль");
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