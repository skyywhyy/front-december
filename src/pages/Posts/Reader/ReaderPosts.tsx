
import adv from "@/assets/adv.png"
import NewsPaper from "@/assets/newspaper.svg?react";
import Phone from "@/assets/phone.svg?react";
import Logout from "@/assets/log-out.svg?react"
import {Toggle} from "@/components/ui/toggle.tsx";

import {Link} from "react-router-dom";
import Header from "@/components/ui/Header.tsx";
import PostCard from "@/pages/Posts/PostCard.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";
import {usePosts} from "@/context/PostContext.tsx";



const ReaderPosts = () => {
    const {logout} = useAuth();
    const {posts} =usePosts()
    return (
        <div className="h-full bg-slate-50">
            <Header/>
            <main className="flex gap-8 justify-center pt-32">

                {/*это слайдбар*/}
                <div className="fixed top-32 left-[336px] w-[208px] h-[672px] flex flex-col justify-between items-start">
                    <div className="flex flex-col items-start">
                        <Link to='/'>
                            <Toggle
                                pressed={true}
                                className="w-[208px] flex justify-start ">
                                <NewsPaper stroke="black"/>
                                Посты
                            </Toggle>
                        </Link>
                        <Link to="/contacts ">
                            <Toggle
                                className="w-[208px] text-slate-400 justify-start ">
                                <Phone stroke="#94A3B8"/>
                                Контакты
                            </Toggle>
                        </Link>
                    </div>
                    <Toggle   onClick={logout}
                              className="w-[208px] text-slate-400 justify-start ">
                        <Logout/>
                        Выйти
                    </Toggle>
                </div>
                {/*конец слайдбару*/}

                {/*посты*/}
                <section className="flex flex-col ml-[240px] w-[768px] gap-[72px]">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post}/>
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

export default ReaderPosts;