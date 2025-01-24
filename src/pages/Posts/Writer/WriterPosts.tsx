import adv from "@/assets/adv.png"
import NewsPaper from "@/assets/newspaper.svg?react";
import Phone from "@/assets/phone.svg?react";
import Logout from "@/assets/log-out.svg?react"
import {Toggle} from "@/components/ui/toggle.tsx";
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
import {Post, usePosts} from "@/context/PostContext.tsx";
import {PublicService} from "@/serviсes/public.service.ts";

const postSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Заголовок должен быть не короче 1 символа"),
    content: z.string().min(1, "Содержание должно быть не короче 1 символа"),
    image: z.union([
        z.instanceof(File),
        z.string(),
        z.null(),
        z.undefined(),
    ]),
});

type PostFormValues = z.infer<typeof postSchema>;

const WriterPosts = () => {
    const [filter, setFilter] = useState("Все посты");
    const {userId, logout} = useAuth();
    const {posts, fetchPosts} =usePosts()
    const filteredPosts = posts.filter((post) => {
        if (filter === "Все посты")  return  post.status === "published" || post.authorId === userId ;
        if (filter === "Мои посты")  return post.authorId === Number(userId);
        if (filter === "Черновики")  return post.status === "draft" && post.authorId === Number(userId);
        return true;
    });



    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => {
        form.reset({
            title: "",
            content: "",
            image: undefined,
        });
        console.log("Форма сброшена для создания:", form.getValues());
        setIsCreateModalOpen(true);
    };
    const closeCreateModal = () => {
        form.reset();
        setIsCreateModalOpen(false)
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = (post: Post) => {
        const imageUrl = post.images && post.images.length > 0
            ? post.images[0].imageUrl
            : undefined;
        form.reset({
            id: post.id,
            title: post.title,
            content: post.content,
            image: imageUrl,
        });
        setIsEditModalOpen(true);
    };
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

    const onCreateSubmit = async (values: PostFormValues, action: "publish" | "draft") => {
        console.log("Данные формы:", values);
        console.log("Действие:", action);
        try {

            const dataForUpdate = {
                title: values.title,
                content: values.content,
                image: values.image instanceof File ? values.image : undefined
            };
            if (values.image instanceof File) {
                dataForUpdate.image = values.image;
            }
            const draftPost = await PublicService.createPost(dataForUpdate);

            console.log("Пост сохранён как черновик:", draftPost);

            if (action === "publish") {
                const publishedPost= await PublicService.publicPost(draftPost.id);
                console.log("Пост успешно опубликован:", publishedPost);
            }
           closeCreateModal();
           await fetchPosts();
        } catch (error) {
            console.error("Ошибка при обработке поста:", error);

        }
    };

    const onEditSubmit = async (values: PostFormValues,  action: "publish" | "draft") => {
        try {
            const post = posts.find((p) => p.id === values.id);
            console.log(post)
            //удаление старого изображения
            if (post?.images && post.images.length > 0) {
                const currentImageUrl = post.images[0].imageUrl;

                // Если пользователь явно удалил картинку (ImageUpload вернул null)
                // или загрузил новую (File)
                if (values.image === null || values.image instanceof File) {
                    const imageId = post.images[0].id;
                    await PublicService.deleteImage(post.id, imageId);
                }
                    // Если пользователь передал другую строку
                else if (typeof values.image === "string" && values.image !== currentImageUrl) {
                    const imageId = post.images[0].id;
                    await PublicService.deleteImage(post.id, imageId);
                }
            }

            const dataForUpdate: {
                title: string;
                content: string;
                image: File | undefined;
            } = {
                title: values.title,
                content: values.content,
                image: values.image instanceof File ? values.image : undefined,
            };
            // Если пользователь загрузил новый файл
            if (values.image instanceof File) {
                dataForUpdate.image = values.image;
            }
            // Если пользователь удалил картинку
            else if (values.image === undefined) {
                dataForUpdate.image = undefined;
            }
            // Если пользователь оставил строку (старый URL) – ничего не делаем
            if (!values.id) throw new Error("ID поста отсутствует");
            await PublicService.editPost(values.id, dataForUpdate);

            if (action === "publish" && post?.status ==="draft") {
                const publishedPost= await PublicService.publicPost(values.id);
                console.log("Пост успешно опубликован:", publishedPost);
            }

            closeEditModal();
            await fetchPosts();
        } catch (error) {
            console.error("Ошибка при обработке поста:", error);

        }
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
                onSubmit={onCreateSubmit}/>
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
                <section className="flex flex-col ml-[240px] w-[768px] gap-6">
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
                                className={clsx(filter === "Черновики" && "bg-slate-100")}
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
                            onPublic={async () => {
                                await PublicService.publicPost(post.id);
                                await fetchPosts();
                            }}
                            onEdit={openEditModal}
                        />
                    ))}
                </section>
                <div className="mt-[72px]">
                    <img src={adv} alt="Реклама"/>
                </div>
            </main>
        </div>
    );
};

export default WriterPosts;