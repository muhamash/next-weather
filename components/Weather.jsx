import { getWeatherData } from "@/utils/weatherInfo";
import Image from "next/image";
import Card from "./Card";
import Heading from "./Heading";

const WeatherComponent = async ( { lat, lon } ) =>
{
    const data = await getWeatherData( lat, lon );
    // console.log( data )
    
    return (
        <Card>
            <Heading data={"weather"}/>
            <div className="feature-main">
                <Image
                    className="max-w-20"
                    src="/icon_rain.png"
                    width={200}
                    height={200}
                    alt="rain icon"
                />
                <h3 className="feature-title">{data?.main}</h3>
                <span className="feature-name">{data?.description}</span>
            </div>
        </Card>
    );
};

export default WeatherComponent;