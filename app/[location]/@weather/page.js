import SuspenseLoader from "@/components/SuspenseLoader";
import WeatherComponent from "@/components/Weather";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function WeatherPage({
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
        <WeatherComponent lat={ resolved?.lat }  lon={ resolved?.lon} />
    </Suspense>
};
