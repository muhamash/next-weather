import { getAQIData } from "@/utils/weatherInfo";
import Image from "next/image";
import Card from "./Card";

const AQIComponent = async ({ lat, lon }) => {
    const data = await getAQIData( lon, lat );
    // console.log(data, lat, lon)

    const getAQIRating = (aqi) => {
        switch (aqi){
          case 1:
            return "Good";
          case 2:
            return "Fair";
          case 3:
            return "Moderate";
          case 4:
            return "Poor";
          case 5:
            return "Very Poor";
          default:
            return "unknown";
        }
      }

    return (
        <Card>
            <h6 className="feature-name">Air Pollution & Quality</h6>

            <div className="mt-3 space-y-2 lg:space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        Air Quality Index
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {getAQIRating(data?.main?.aqi)}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        Carbon Monoxide
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {data?.components?.co} µg/m³
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        Nitric Monoxide
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {data?.components?.no} μg/m3
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        Nitrogen Dioxide
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {data?.components?.no2} μg/m3
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        Ozone
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {data?.components?.o3} μg/m3
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        Sulfur Dioxide
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {data?.components?.so2} μg/m3
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#CADEE8] lg:text-base">
                        <Image
                            className="max-w-[18px]"
                            src="/icon_air_element.png"
                            alt="icon"
                            width={18}
                            height={18}
                        />
                        PM2.5
                    </div>
                    <span className="text-right text-sm text-white lg:text-base">
                        {data?.components?.pm2_5} μg/m3
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default AQIComponent;