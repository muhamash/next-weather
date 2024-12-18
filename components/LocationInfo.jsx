import { getLocationData } from "@/utils/loactionInfo";
import LocationSwitcher from "./LocationSwitcher";

const LocationInfo = async ({ lat, lon }) => {
    const locationInfo = await getLocationData( lat, lon );
    // console.log( locationInfo);

    return (
        <div className="col-span-12 flex flex-col justify-end lg:col-span-8 2xl:col-span-9">
            <div>
                <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-3xl font-bold text-white lg:text-4xl 2xl:text-[40px]">
                        {locationInfo?.address?.suburb || locationInfo?.address?.town || locationInfo?.address?.city || locationInfo?.name || locationInfo?.address?.village} | <span className="text-sm font-mono uppercase px-1 text-slate-300">{ locationInfo?.type }</span>
                    </h2>
                    <LocationSwitcher/>
                </div>
                <p className="text-lg text-[#C4C4C4] lg:text-xl">
                    {locationInfo?.address?.state_district || locationInfo?.name || locationInfo?.address?.city_district || locationInfo?.address?.county || locationInfo?.address?.city} | {locationInfo?.address?.state || locationInfo?.address?.quarter || locationInfo?.address?.suburb || locationInfo?.address?.county} | {locationInfo?.address?.country_code}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#92B6F5] lg:text-sm">
                    <span>{new Date().toLocaleTimeString()}</span>{" "}
                    <span>{new Date().toDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default LocationInfo;