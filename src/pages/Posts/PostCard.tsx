import clsx from "clsx";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Card, CardTitle } from "@/components/ui/card.tsx";
import Likes from "@/assets/likes.svg";
import comments from "@/assets/comments.svg";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";

const PostCard = ({
                      post,
                      clickable = true,
                      onPublic,
                      onEdit,

                  }) => {
    const {role, email} = useAuth();
    const archive= post.draft;
    const isAuthorOfPost = role === "Author" && email === post.author;
    const content = (
        <Card
            className={clsx(
                "w-[768px] p-4 flex flex-col gap-4 rounded-xl border-none shadow-none",
                {
                    "hover:bg-slate-200 cursor-pointer": clickable,
                }
            )}
        >
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <Label className="font-normal">{post.author}</Label>
                    <Label className="text-xs text-slate-400">{post.date}</Label>
                </div>
            </div>
            <CardTitle>{post.title}</CardTitle>
            {post.image ? (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[432px] object-cover"
                />
            ) : (
                <div className="h-[432px] bg-slate-300 rounded-md flex items-center justify-center">
                    <p className="text-slate-600">Нет изображения</p>
                </div>
            )}
            <p className="mt-2 text-sm">{post.content}</p>
            {isAuthorOfPost && (
                <div className="mt-4 flex gap-2">
                    {archive && ( // Если архивный, показываем "Опубликовать" и "Редактировать"
                        <>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPublic();
                                }}
                            >
                                Опубликовать
                            </Button>
                        </>
                    )}
                    <Button
                        variant={"secondary"}
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit();
                        }}
                    >
                        Редактировать
                    </Button>
                </div>
            )}
            <div className="text-sm text-slate-400 flex gap-3">
                <div className="w-[60px] h-7 bg-slate-50 rounded flex items-center justify-center gap-2">
                    <img src={Likes} />
                    <p>{post.likes}</p>
                </div>
                <div className="w-[60px] h-7 bg-slate-50 rounded flex items-center justify-center gap-2">
                    <img src={comments} />
                    <p>{post.comments}</p>
                </div>
            </div>

        </Card>
    );

    return clickable ? <Link to={`/post/${post.id}`}>{content}</Link> : content;
};

export default PostCard;
