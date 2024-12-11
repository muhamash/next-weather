import AQIComponent from "@/components/Aqi";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";

export default async function AQIPage({
    params: { location },
    searchParams: { latitude, longitude },
} )
{
  const resolved = await getResolvedLatLong( location, longitude, latitude )
  // console.log( resolved )

  if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
  return <AQIComponent lat={ resolved?.lat }  lon={ resolved?.lon}/>
};