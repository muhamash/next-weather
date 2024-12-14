import WeatherComponent from "@/components/Weather";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";

export default async function WeatherPage({
    params,
    searchParams: { latitude, longitude },
} )
{
    const resolved = await getResolvedLatLong( params, latitude, longitude )

    if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }

    return <WeatherComponent lat={ resolved?.lat }  lon={ resolved?.lon} />
};
