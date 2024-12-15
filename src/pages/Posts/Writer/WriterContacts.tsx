import logo from "@/assets/logo.png";
import {Label} from "@/components/ui/label.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Link} from "react-router-dom";
import {Toggle} from "@/components/ui/toggle.tsx";
import {ReactComponent as NewsPaper} from "@/assets/newspaper.svg"
import {ReactComponent as Phone} from "@/assets/phone.svg";
import {ReactComponent as Logout} from "@/assets/log-out.svg"



const WriterContacts = () => {

    return (
        <div className="bg-slate-50" >
            <header className="w-full fixed  top-0 left-0 flex items-center bg-white justify-between px-[336px] z-10">
                <img className="py-[30px]" src={logo} alt="Логотип"/>
                <div className="flex items-center gap-3">
                    <Label className="font-normal">gospodin.huesosik@gmail.com</Label>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <main className="flex mt-12 my-auto gap-8 px-[336px]">

                {/*это слайдбар*/}
                <div className="fixed top-32 left-[336px] w-[208px] h-[672px] flex flex-col justify-between items-start">
                    <div className="flex flex-col items-start">
                        <Link to='/'>
                            <Toggle
                                className="w-[208px] text-slate-400 flex justify-start ">
                                <NewsPaper stroke="#94A3B8"/>
                                Посты
                            </Toggle>
                        </Link>
                        <Link to="/contacts ">
                            <Toggle
                                pressed={true}
                                className="w-[208px]  justify-start ">
                                <Phone stroke="black"/>
                                Контакты
                            </Toggle>
                        </Link>
                    </div>
                    <Link to="/reg">
                        <Toggle
                            className="w-[208px] text-slate-400 justify-start ">
                            <Logout/>
                            Выйти
                        </Toggle>
                    </Link>
                </div>
                {/*конец слайдбару*/}

            </main>
        </div>
    );
};

export default WriterContacts;