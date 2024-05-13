import Image from "next/image"
import logout from "../../../public/logout (7).png"
import { useRouter } from "next/navigation";

export default function Logout(){
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login')
    }

    return (
        <Image onClick={() => handleLogout()} className="absolute translate-x-[45vw] -translate-y-[45vh] cursor-pointer"
            src={logout} alt="logout" width={20} height={20} />
    )

}