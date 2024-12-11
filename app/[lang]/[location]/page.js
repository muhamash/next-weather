import LocationInfo from "@/components/LocationInfo";
import { getResolvedLatLong } from "@/utils/loactionInfo";
import { notFound } from "next/navigation";

export default async function LocationPage({
    params: { location },
    searchParams: { latitude, longitude },
} )
{
    const resolved = await getResolvedLatLong( location, longitude, latitude )

    if(resolved?.lat === undefined && resolved?.lon === undefined){
        notFound();
    }

    return (
         <LocationInfo lat={ resolved?.lat }  lon={ resolved?.lon} />
    );
}
