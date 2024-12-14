import { getTemperatureData } from "@/utils/weatherInfo";
import Image from "next/image";
import Card from "./Card";
import Heading from "./Heading";

const TemperatureComponent = async ({ lat, lon }) => {
    const data = await getTemperatureData( lat, lon );
    
    return (
        <Card>
            <Heading data={"temp"}/>
            <div className="feature-main">
                <Image
                    className="max-w-20"
                    src="/icon_tempareture.png"
                    alt="rain icon"
                    width={80}
                    height={80}
                />
                <h3 className="feature-title">{data?.temp}°C</h3>
                <span className="feature-name">Feels Like {data?.feels_like}°C</span>
            </div>
        </Card>
    );
};

export default TemperatureComponent;