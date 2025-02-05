import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import Upload from "@/assets/upload.svg?react";
import Delete from "@/assets/trash-2.svg?react";

interface ImageUploadProps{
    initialImageUrl?: string;
    fileSelect:(file: File|null) => void;
}

const ImageUpload :React.FC<ImageUploadProps> = ({ initialImageUrl,fileSelect}   ) => {
    const [imageSrc, setImageSrc] = useState<string | null>( initialImageUrl|| null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (initialImageUrl) {
            setImageSrc(initialImageUrl); // Устанавливаем начальный URL
        }
    }, [initialImageUrl]);


    const handleUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageSrc(URL.createObjectURL(file));
            fileSelect(file);
        }
    };

    const handleRemoveClick = () => {
        setImageSrc(null);
        fileSelect(null);
    };

    const renderImagePreview = () => (
        <div className="relative group h-[288px] bg-slate-300 rounded-md flex items-center justify-center">
            <img
                src={imageSrc!}
                alt="Загруженное изображение"
                className="w-full h-full rounded-md"
            />
            <div className="absolute inset-0 bg-black rounded-md bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Delete
                onClick={handleRemoveClick}
                className="absolute top-0 right-0 m-4 cursor-pointer"
            />
        </div>
    );

    const renderUploadButton = () => (
        <>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <Button onClick={handleUploadClick} >
                <Upload  /> Загрузить изображение
            </Button>
        </>
    );

    return (
        <div >
            {imageSrc ? renderImagePreview() : renderUploadButton()}
            </div>
    );
};

export default ImageUpload;