import React, {useState} from 'react';
import {Label} from "@/components/ui/label.tsx";
import logo from "@/assets/logo.png"
import adv from "@/assets/adv.png"
import newsPaper from "@/assets/newspaper.svg"
import phone from "@/assets/phone.svg"
import logout from "@/assets/log-out.svg"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Toggle} from "@/components/ui/toggle.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import posts from "./postsdata.ts"
import {Link} from "react-router-dom";


const Posts = () => {
    const [selected, setSelected] = useState("posts");
    return (
        <div className="bg-slate-50">
            <header className="w-full flex items-center bg-white justify-between px-[336px]">
                <img className="py-[30px]" src={logo} alt="Логотип"/>
                <div className="flex items-center gap-3">
                    <Label>gospodin.huesosik@gmail.com</Label>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <main className="flex mt-12 my-auto gap-8 px-[336px]">

                {/*это слайдбар*/}
                <div className=" w-[208px] h-[872px] flex flex-col justify-between items-start">
                    <div className="flex flex-col items-start">
                        <Link to='/'>
                            <Toggle
                                aria-pressed={selected === "posts"}
                                onClick={() => setSelected("posts")}
                                className="w-[208px] flex justify-start ">
                                <img src={newsPaper}/>
                                Посты
                            </Toggle>
                        </Link>
                        <Link to="/contacts ">
                            <Toggle
                                onClick={() => setSelected("contacts")}
                                className="w-[208px] text-slate-400 justify-start ">
                                <img src={phone}/>
                                Контакты
                            </Toggle>
                        </Link>
                    </div>
                    <Link to="/reg">
                        <Toggle
                            onClick={() => setSelected("reg")}
                            className="w-[208px] text-slate-400 justify-start ">
                            <img src={logout}/>
                            Выйти
                        </Toggle>
                    </Link>
                </div>
                {/*конец слайдбару*/}

                <section className="flex flex-col gap-[72px] ">
                    {posts.map((post) => (
                        <Card key={post.id} className="w-[768px] hover:bg-slate-200 p-4">
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Label>{post.author}</Label>
                                    <Label className="text-xs text-slate-400">{post.date}</Label>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-[432px] object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="h-[432px] bg-slate-300 rounded flex items-center justify-center">
                                        <p className="text-slate-600">Нет изображения</p>
                                    </div>
                                )}
                                <p className="mt-2 text-sm">{post.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
                <div>
                    <img src={adv} alt="Реклама"/>
                </div>
            </main>
        </div>
    )
        ;
};

export default Posts;