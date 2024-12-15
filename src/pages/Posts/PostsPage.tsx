import WriterPosts from "@/pages/Posts/Writer/WriterPosts.tsx";
import ReaderPosts from "@/pages/Posts/Reader/ReaderPosts.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";

const PostsPage = () => {
    const  {role}  = useAuth();
    if (!role) {
        return <div>Загрузка...</div>;
    }
    if (role === "Author") {
        return <WriterPosts />;
    }
    return <ReaderPosts />;
};
export default PostsPage;