import {Post} from "@/context/PostContext.tsx";


export async function getPosts() :Promise<Post[]> {
    const API_URL = "https://cpt-stage-2.duckdns.org/api/posts";
    const accessToken =localStorage.getItem("token")
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        throw error;
    }
}