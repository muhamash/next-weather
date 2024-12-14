import { getWindData } from "@/utils/weatherInfo";
import Image from "next/image";
import Card from "./Card";
import Heading from "./Heading";

const WindComponent = async ({ lat, lon }) => {
    const data = await getWindData( lat, lon );
    // console.log(data);
    return (
        <Card>
            { 
            data ? (
                    <>
                        <Heading data={"wind"}/>
                        <div className="feature-main">
                            <Image
                                className="max-w-20"
                                src="/icon_wind.png"
                                alt="wind icon"
                                width={80}
                                height={80}
                            />
                            <div className="flex flex-col gap-3">
                                <h3 className="feature-title">{data.speed} meter/sec</h3>
                                <p className="feature-name">{data.deg} degrees</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>This location is not integrated with the API --- OpenWeatherMap!!</p>
                )}
        </Card>
    );
}

export default WindComponent;