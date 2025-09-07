import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react";
import Link from "next/link"
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author }

const StartupCard = ({post}:{post: StartupCardType}) => {
    const { 
        _createdAt,
        _id,
        views,
        author,
         title,
         description,
         image,
         category
     } = post;

    //  console.log(author)

  return (
    <li className="startup-card group">
        <div className="flex justify-between items-center gap-3">
            <p className="startup-card_date">
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary" />
                <span className="text-[16px] font-medium">{views}</span>
            </div>
        </div>
        <div className="flex flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}`}>
                    <p className="text-[16px] font-medium line-clamp-1">{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className="text-[26px] font-bold line-clamp-1">{title}</h3>
                    
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <img src={author?.image} alt={author?.name} width={48} height={48} className="rounded-full" />
            </Link>
        </div>
        <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">{description}</p>
            <img src={image} alt={title} className="startup-card_img" />
        </Link>
        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${category?.toLowerCase()}`} >
            <p className="text-16-medium">{category}</p>
            </Link>
            <Button className="startup-card_btn" asChild>
                <Link href={`/startup/${_id}`}>Details</Link>
            </Button>
        </div>
    </li>
  )
}

export const StartupCardSkeleton = () => (
    <>
    {[1,2,3,4].map((index:number) => (
        <li key={cn('skeleton', index)}>
            <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400"/>
        </li>
    ))}
    </>
)

  
export default StartupCard