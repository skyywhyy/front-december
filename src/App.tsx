import {
    BrowserRouter, Navigate,
    Route, Routes,
} from "react-router-dom";
import ReaderContacts from "@/pages/Posts/Reader/ReaderContacts.tsx";
import ReaderPostPage from "@/pages/Posts/Reader/ReaderPostPage.tsx";
import WriterPostPage from "@/pages/Posts/Writer/WriterPostPage.tsx";
import AuthPage from "@/pages/Auth/AuthPage.tsx";
import { useAuth} from "@/context/AuthProvider.tsx";
import PostsPage from "@/pages/Posts/PostsPage.tsx";


function App() {
    const {isAuthenticated, role} = useAuth();
    return (
     <div>
             <BrowserRouter>
                 <Routes>
                     <Route path="/" element={isAuthenticated ? <PostsPage/> : <Navigate to="/auth" />} />
                     <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} />

                     <Route path="/contacts" element={<ReaderContacts />} />
                     <Route path="/post/:postId" element={role === "Author" ? <WriterPostPage /> : <ReaderPostPage />} />
                 </Routes>
             </BrowserRouter>
     </div>
  )
}

export default App
