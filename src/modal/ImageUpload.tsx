import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import Upload from "@/assets/upload.svg?react";
import Delete from "@/assets/trash-2.svg?react";

const ImageUpload = () => {
    const [isImageVisible, setIsImageVisible] = useState(false); // Управляем отображением изображения

    const handleUploadClick = () => {
        setIsImageVisible(true); // Показываем изображение

    };

    const handleRemoveClick = () => {
        setIsImageVisible(false); // Убираем изображение
    };
    return (
        <div >
            {isImageVisible ? (
                <div className="relative group h-[288px] bg-slate-300 rounded-md flex items-center justify-center">
                    <img
                        src=""
                        alt="Пример изображения"
                    />
                    <div
                        className="absolute inset-0 bg-black  rounded-md bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">

                    </div>
                    <Delete
                        onClick={handleRemoveClick}
                        className="absolute top-0 right-0 m-4"
                    />
                </div>


            ) : (
                <Button onClick={handleUploadClick}> <Upload/> Загрузить изображение</Button>
            )}
        </div>
    );
};

export default ImageUpload;