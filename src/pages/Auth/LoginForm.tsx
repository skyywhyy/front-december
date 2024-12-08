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
import {Link, useNavigate} from "react-router-dom";

const formSchema = z.object({
    email: z.string().min(2, "Введите корректный email").max(50),
    password: z.string().min(6, "Пароль должен содержать не менее 6 символов").max(50)
})
    const LoginForm = () => {
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password:""
            },
        })

        const navigate = useNavigate();
        function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values)
            navigate('/posts');
        }
        return (
            <div className="flex justify-center items-center w-screen h-screen bg-slate-50">
                <div className="bg-white p-4 rounded-xl gap-4 w-96 flex-row justify-center">
                    <Label className="text-xl font-semibold pb-4">
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
                        Нет аккаунта? <Link to="/reg" className="text-indigo-500 hover:text-indigo-300">Создать аккаунт</Link>
                    </Label>
                </div>
            </div>
        );
    };



export default LoginForm;