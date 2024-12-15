import {Label} from "@/components/ui/label.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import ImageUpload from "@/modal/ImageUpload.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UseFormReturn} from "react-hook-form";
import {FC} from "react";

interface PostFormValues {
    title: string;
    content: string;
    image?: FileList | undefined;
}
interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<PostFormValues>;
    onSubmit: (values: { title: string; content: string }) => void;
    title: string;
}

const PostModal: FC<PostModalProps> = ({isOpen, onClose, form, onSubmit, title}) => {
    if (!isOpen) return null;

    return(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
             onClick={onClose}
        >
            <div
                className="bg-white p-4 rounded-md w-[544px] shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <Form<PostFormValues> {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="flex flex-col gap-4">
                            <Label className="text-xl">{title}</Label>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Заголовок</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Введите заголовок" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <ImageUpload />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Поле для содержания */}
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Контент</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Введите контент"
                                                {...field}
                                            ></Textarea>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Кнопка отправки */}
                            <div className='flex gap-2'>
                                <Button type="submit">
                                    Опубликовать пост
                                </Button>
                                <Button variant="secondary" type="submit">
                                    Отправить в черновики
                                </Button>
                            </div>

                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
};

export default PostModal;