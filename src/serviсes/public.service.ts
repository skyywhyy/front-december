import { v4 as uuidv4 } from "uuid";

const API_URL = "https://cpt-stage-2.duckdns.org/api/posts";

export const PublicService = {
    createPost: async (data: { title: string; content: string; image?: File }) => {
        const idempotencyKey = uuidv4();
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ...data, idempotencyKey }),
        });
        if (!response.ok) {
            throw new Error(`Ошибка создания поста: ${response.statusText}`);
        }
        const createdPost = await response.json();
        if (data.image) {
            await PublicService.uploadImage(createdPost.id, data.image);
        }
        return await createdPost;
    },

    editPost: async (postId: number, data: { title: string; content: string; image?:File }) => {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Ошибка редактирования поста: ${response.statusText}`);
        }

        // Если есть изображение, загружаем его
        if (data.image) {
            await PublicService.uploadImage(postId, data.image);
        }

        return {};

    },

    publicPost: async (postId: number) => {
        const response = await fetch(`${API_URL}/${postId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ status: "Published" }),
        });
        if (!response.ok) {
            throw new Error(`Ошибка изменения состояния поста: ${response.statusText}`);
        }
        return {};
    },
    publishPost:  async (data: { title: string; content: string }) => {
        try {
            const draftPost = await PublicService.createPost(data);
            console.log("Черновик создан:", draftPost);

            const publishedPost = await PublicService.publicPost(draftPost.id);
            console.log("Пост опубликован:", publishedPost);

            return {};
        } catch (error) {
            console.error("Ошибка при публикации поста:", error);
            throw error;
        }
    },

    uploadImage: async (postId: number, file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch(`${API_URL}/${postId}/images`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Ошибка изменения изображения: ${response.statusText}`);
        }
        return {};
    },

    deleteImage: async (postId: number, imageId: number) => {
        const response = await fetch(`${API_URL}/${postId}/images/${imageId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка удаления изображения: ${response.statusText}`);
        }
        return {};
    },
};