import SuspenseLoader from "@/components/SuspenseLoader";
import TemperatureComponent from "@/components/Temp";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function TemperaturePage({
    params: { location },
    searchParams: { latitude, longitude },
} )
{
  const resolved = await getResolvedLatLong( location, longitude, latitude )
  if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
  return <Suspense fallback={
    <SuspenseLoader/>
  }>
    <TemperatureComponent lat={ resolved?.lat }  lon={ resolved?.lon} />
  </Suspense>
}
