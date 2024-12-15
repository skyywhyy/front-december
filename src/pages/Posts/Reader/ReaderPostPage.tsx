import {Link, useParams} from "react-router-dom";
import posts from "../postsdata.ts";
import Header from "@/components/ui/Header.tsx";
import NewsPaper from "@/assets/newspaper.svg?react";
import Phone from "@/assets/phone.svg?react";
import Logout from "@/assets/log-out.svg?react"
import {Toggle} from "@/components/ui/toggle.tsx";
import adv from "@/assets/adv.png";
import PostCard from "@/pages/Posts/PostCard.tsx";


const ReaderPostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const post = posts.find((p) => p.id === parseInt(postId || "", 10));

    if (!post) {
        return <div className="flex justify-center items-center text-9xl text-red-600">Пост не найден</div>;
    }

    return (
        <div className=" min-h-screen flex flex-col bg-slate-50">
            <Header/>
            <main className="flex gap-8 px-[336px] pt-32">
                {/*это слайдбар*/}
                <div
                    className="fixed top-32 left-[336px] w-[208px] h-[672px] flex flex-col justify-between items-start">
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
                    <Link to="/reg">
                        <Toggle
                            className="w-[208px] text-slate-400 justify-start ">
                            <Logout/>
                            Выйти
                        </Toggle>
                    </Link>
                </div>
                {/*конец слайдбару*/}
                <section className="flex flex-col ml-[240px]">
                   <PostCard post={post} clickable={false}/>
                </section>
                <div>
                    <img src={adv} alt="Реклама"/>
                </div>
            </main>
        </div>
    );
};

export default ReaderPostPage;
