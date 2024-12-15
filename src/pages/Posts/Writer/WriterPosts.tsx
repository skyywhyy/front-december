import adv from "@/assets/adv.png"
import NewsPaper from "@/assets/newspaper.svg?react";
import Phone from "@/assets/phone.svg?react";
import Logout from "@/assets/log-out.svg?react"

import {Toggle} from "@/components/ui/toggle.tsx";
import posts from "@/pages/Posts/postsdata.ts"
import {Link} from "react-router-dom";
import Header from "@/components/ui/Header.tsx";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar.tsx";
import {useState} from "react";
import PostCard from "@/pages/Posts/PostCard.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";
import {Button} from "@/components/ui/button.tsx";
import clsx from "clsx";
import PostModal from "@/modal/PostModal.tsx";
import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const postSchema = z.object({
    title: z.string().min(3, "Заголовок должен быть не короче 3 символов"),
    content: z.string().min(10, "Содержание должно быть не короче 10 символов"),
    image: z
        .union([z.instanceof(FileList), z.undefined()]) // Поле может быть FileList или undefined
        .optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

const WriterPosts = () => {
    const [filter, setFilter] = useState("Все посты"); // Состояние фильтра

    const {email, logout} = useAuth();

    const filteredPosts = posts.filter((post) => {
        if (filter === "Все посты")  return post?.draft === false || post.author === email;;
        if (filter === "Мои посты") return post.author === email;
        if (filter === "Черновики") return post.draft && post.author === email;
        return true;
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => setIsCreateModalOpen(true)
    const closeCreateModal = () => {
        form.reset();
        setIsCreateModalOpen(false)
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true)
    const closeEditModal = () => {
        form.reset();
        setIsEditModalOpen(false)
    }


    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            image: undefined,
        },
    });

    const onOpenSubmit = (values: PostFormValues) => {
        console.log("Новый пост:", values);
        setIsCreateModalOpen(false);
        form.reset();
    };

    const onEditSubmit = (values: PostFormValues) => {
        console.log("Пост отредачен:", values);
        setIsEditModalOpen(false);
        form.reset();
    };



    return (
        <div className="bg-slate-50">

            {/*окно для редактирования*/}
            <PostModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                form={form}
                title="Редактировать"
                onSubmit={onEditSubmit}/>


            {/*окно для создания*/}
            <PostModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                form={form}
                title="Создать пост"
                onSubmit={onOpenSubmit}/>
            <Header/>
            <main className="flex gap-8 px-[336px] pt-32">

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
                    <Link onClick={logout} to="/auth">
                        <Toggle
                            className="w-[208px] text-slate-400 justify-start ">
                            <Logout/>
                            Выйти
                        </Toggle>
                    </Link>
                </div>
                {/*конец слайдбару*/}

                {/*посты*/}
                <section className="flex flex-col ml-[240px]  gap-6">
                    <Menubar className="w-[304px]">
                        <MenubarMenu>
                            <MenubarTrigger
                                onClick={() => setFilter("Все посты")}
                                className={clsx(filter === "Все посты" && "bg-slate-100 ")}
                            >
                                Все посты
                            </MenubarTrigger>
                            <MenubarTrigger
                                onClick={() => setFilter("Мои посты")}
                                className={clsx(filter === "Мои посты" && "bg-slate-100 ")}
                            >
                                Мои посты
                            </MenubarTrigger>
                            <MenubarTrigger
                                onClick={() => setFilter("Черновики")}
                                className={clsx(filter === "Черновики" && "bg-slate-200 text-black")}
                            >
                                Черновики
                            </MenubarTrigger>
                        </MenubarMenu>
                    </Menubar>
                    {filter === "Мои посты" && <Button onClick={openCreateModal}>Создать пост</Button>}
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            clickable={true}
                            onPublic={() => console.log("Пост опубликован!")}
                            onEdit={openEditModal}
                        />
                    ))}
                </section>
                <div className="mt-[72px]">
                    <img src={adv} alt="Реклама"/>
                </div>
            </main>
        </div>
    )
        ;
};

export default WriterPosts;