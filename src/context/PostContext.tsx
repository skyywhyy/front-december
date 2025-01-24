import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getPosts} from "@/serviсes/posts.service.ts";
import {useAuth} from "@/context/AuthProvider.tsx";

export interface Image {
    id: number;
    imageUrl: string;
}
export interface Post {
    id: number;
    authorId: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    status: "published" | "draft";
    images: Image[];
    likes: number;
    comments: number;
}

interface PostContextValue {
    posts: Post[];
    fetchPosts: ()=> Promise<void>
}
interface IPostProvider{
    children: ReactNode;
}
export const PostContext =createContext<PostContextValue |undefined> (undefined);
export const PostsProvider = ({ children} :IPostProvider ) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const {isAuthenticated} = useAuth();
    const fetchPosts = async () => {
        try {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Ошибка при загрузке постов:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token  && posts.length === 0) {
            fetchPosts();
        }
        else {
            setPosts([]);
        }
    }, [isAuthenticated]);

    return (
        <PostContext.Provider value={{posts, fetchPosts}}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = (): PostContextValue => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePosts должен использоваться внутри PostsProvider");
    }
    return context;
};