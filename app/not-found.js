// "use client"

// import { useParams } from "next/navigation";

export default function NotFoundPage ()
{
    // const params = useParams();
    // console.log( params );
    
    return (
        <div className="h-screen bg-slate-500 w-full flex items-center justify-center gap-5 flex-col">
            <div className="notFoundLoader"></div>
            <p className="text-rose-700 text-md">There is no data!!!!</p>
        </div>
    )
}