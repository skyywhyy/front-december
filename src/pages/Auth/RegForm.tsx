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
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";
import {registerService} from "@/pages/Auth/servises/auth.service.ts";
import {useState} from "react";

const formSchema = z.object({
    email: z.string().min(2, "Введите корректный email").max(50),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов").max(50),
    confirmPassword: z.string().min(6, "Пароль должен содержать не менее 6 символов").max(50),
    role: z.enum(["Author", "Reader"])
})
    .refine((data) => data.password === data.confirmPassword, {
        message:"Пароли не совпадают",
        path:["confirmPassword"],
} );

const RegForm = ({ switchToLogin }: { switchToLogin: () => void }) => {
    const {login} = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password:"",
            confirmPassword: "",
            role : "Reader"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { refreshToken, accessToken } = await registerService(values);
            if(refreshToken && accessToken){
                localStorage.setItem("token", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("email", values.email);
                login();
            }

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message || "Ошибка при регистрации");
            } else {
                setErrorMessage("Неизвестная ошибка");
            }
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-50">
            <div className="flex flex-col bg-white p-4 rounded-xl gap-4 w-96 justify-center">
                <Label className="text-xl font-semibold">
                    Создать аккаунт
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Повторите пароль</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Повторите пароль" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Выберите роль</FormLabel>
                                    <Tabs
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <TabsList>
                                            <TabsTrigger value="Reader">Читатель</TabsTrigger>
                                            <TabsTrigger value="Author">Автор</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </FormItem>
                            )}
                        />

                        {errorMessage && (
                            <div className={""} style={{ color: "red", marginTop: "10px" }}>
                                {errorMessage}
                            </div>
                        )}

                        <Button className="w-full" type="submit">Создать аккаунт</Button>
                    </form>
                </Form>

                <Label>
                    Уже есть аккаунт? <span onClick={switchToLogin} className="text-indigo-500 hover:text-indigo-300">Войти</span>
                </Label>

            </div>

        </div>
    );
};

export default RegForm;