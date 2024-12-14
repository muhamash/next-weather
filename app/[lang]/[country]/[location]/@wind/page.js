import SuspenseLoader from "@/components/SuspenseLoader";
import WindComponent from "@/components/Wind";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function WindPage({
    params: { location },
    searchParams: { latitude, longitude },
  }) {
    const resolved = await getResolvedLatLong(location, latitude, longitude)

    if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
    return <Suspense fallback={
      <SuspenseLoader/>
    }>
      <WindComponent lat={ resolved?.lat }  lon={ resolved?.lon} />
    </Suspense>
      
}