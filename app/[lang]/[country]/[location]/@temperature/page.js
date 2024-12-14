import TemperatureComponent from "@/components/Temp";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";

export default async function TemperaturePage({
    params,
    searchParams: { latitude, longitude },
} )
{
  const resolved = await getResolvedLatLong( params, latitude, longitude )
  if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }
  
  return <TemperatureComponent lat={ resolved?.lat }  lon={ resolved?.lon} />
}
