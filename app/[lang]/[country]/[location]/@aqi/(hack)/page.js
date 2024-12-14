import AQIComponent from "@/components/Aqi";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";

export default async function AQIPage({
    params,
    searchParams: { latitude, longitude },
} )
{
  const resolved = await getResolvedLatLong( params, latitude, longitude )
  // console.log( resolved )

  if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
  return <AQIComponent lat={ resolved?.lat }  lon={ resolved?.lon}/>
};