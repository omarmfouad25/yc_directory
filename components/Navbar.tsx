import Image from "next/image"
import Link from "next/link"
import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"

const Navbar = async () => {
    const session = await auth()
  return (
    <>
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span className="max-sm:hidden ring-2 ring-blue-500 rounded-full px-3 py-1 text-blue-500 hover:bg-blue-100"> Create</span>
                                <BadgePlus className="size-6 sm:hidden text-blue-500"/>
                            </Link>

                            <button onClick={async () => {
                                "use server"
                                await signOut();
                            }}>
                                {/* <span className="max-sm:hidden">Logout</span> */}
                                <LogOut className="size-6  text-red-600 cursor-pointer"/>
                            </button>
                            {console.log(session)}

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-9">
                                    <AvatarImage 
                                    src={session?.user?.image || "https://placehold.co/40x40"} 
                                    alt={session?.user?.name || ""} 
                                    />
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <button onClick={async () => {
                            "use server"
                            await signIn("github");
                        }}>
                            <span className="ring-2 ring-blue-500 rounded-full px-3 py-1 text-blue-500 hover:bg-blue-100 hover:text-blue-700 cursor-pointer">Login</span>
                        </button>

                        //    <form
                        //     action={async () => {
                        //         "use server"
                        //         await signIn()
                        //     }}
                        //     >
                        //     <button type="submit">Sign in</button>
                        // </form>
                    )}
                </div>
            </nav>
        </header>
    </>
  )
}

export default Navbar