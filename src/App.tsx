import {
    BrowserRouter,
    Route, Routes,
} from "react-router-dom";
import RegForm from "@/pages/Auth/RegForm.tsx";
import LoginForm from "@/pages/Auth/LoginForm.tsx";
import Posts from "@/pages/Posts/Posts.tsx";
import Contacts from "@/pages/Contacts.tsx";


function App() {
    return (
     <div>
         <BrowserRouter>
             <Routes>
                 <Route path="/" element={<Posts/>}/>
                 <Route path="/posts" element={<Posts />} />
                 <Route path="/login" element={<LoginForm />} />
                 <Route path="/reg" element={<RegForm />} />
                 <Route path="/contacts" element={<Contacts/>}/>
             </Routes>
         </BrowserRouter>
     </div>
  )
}

export default App
