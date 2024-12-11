import { getWindData } from "@/utils/weatherInfo";
import Image from "next/image";
import Card from "./Card";


const WindComponent = async ({ lat, lon }) => {
    const data = await getWindData( lon, lat );

    return (
        <Card>
            <h6 className="feature-name">Wind</h6>
            <div className="feature-main">
                <Image
                    className="max-w-20"
                    src="/icon_wind.png"
                    alt="rain icon"
                    width={ 80 }
                    height={ 80 }
                />
                <div className="flex flex-col gap-3">
                    <h3 className="feature-title">{ data?.speed } meter/sec</h3>
                    <p className="feature-name">{data?.deg } degrees</p>
                </div>
            </div>
        </Card>
    );
};

export default WindComponent;