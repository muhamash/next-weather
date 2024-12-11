import AQIComponent from "@/components/Aqi";
import SuspenseLoader from "@/components/SuspenseLoader";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function AQIPage({
    params: { location },
    searchParams: { latitude, longitude },
} )
{
  const resolved = await getResolvedLatLong( location, longitude, latitude )
  console.log(resolved)
  if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
  return <Suspense fallback={
    <SuspenseLoader/>
  }>
    <AQIComponent lat={ resolved?.lat }  lon={ resolved?.lon}/>
  </Suspense>
};