import TemperatureComponent from "@/components/Temp";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";

export default async function TemperaturePage({
    params: { location },
    searchParams: { latitude, longitude },
} )
{
  const resolved = await getResolvedLatLong( location, latitude, longitude )
  if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
  return <TemperatureComponent lat={ resolved?.lat }  lon={ resolved?.lon} />
}
