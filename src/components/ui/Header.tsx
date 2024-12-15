import logo from "@/assets/logo.png";
import {Label} from "@/components/ui/label.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAuth} from "@/context/AuthProvider.tsx";

const Header = () => {
    const {email} =useAuth();
    return (
        <header className="w-full fixed  top-0 left-0 flex items-center bg-white justify-between px-[336px] z-10">
            <img className="py-[30px]" src={logo} alt="Логотип"/>
            <div className=" flex items-center gap-3">
                <Label className="font-normal">{email}</Label>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
};

export default Header;