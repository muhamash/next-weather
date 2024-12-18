import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Image from "next/image";
import "../../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Weather -> ecoVista",
    description: "One Place Dashboard for Eco Information",
};

export default function RootLayout({
    children,
    weather,
    aqi,
    wind,
    temperature,
} )
{
    return (
        <div className="wrapper">
            <div className="overlay"></div>
            <Image
                alt="bgImg?"
                src="/background.png"
                className="bg-img"
                width={700}
                height={ 1200 }
                placeholder="blur" 
                blurDataURL="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHZpZXdCb3g9IjAgMCAzMDUgMzA1IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxyZWN0IHg9IjQ1Ljg4NSIgeT0iNy41IiBzdHlsZT0iZmlsbDojRkZEQjc3OyIgd2lkdGg9IjE3My4yMyIgaGVpZ2h0PSIyNTAiLz4NCgk8cG9seWdvbiBzdHlsZT0iZmlsbDojMjhEMkU0OyIgcG9pbnRzPSIyMTkuMTE1LDQ3LjUgMjE5LjExNSwyNTcuNSA4NS44ODUsMjU3LjUgODUuODg1LDI5Ny41IDI1OS4xMTUsMjk3LjUgMjU5LjExNSw0Ny41IAkiLz4NCgk8Zz4NCgkJPHBhdGggc3R5bGU9ImZpbGw6IzIyMzEzRjsiIGQ9Ik0yNTkuMTE1LDQwaC0zMi41VjcuNWMwLTQuMTQyLTMuMzU3LTcuNS03LjUtNy41SDQ1Ljg4NWMtNC4xNDMsMC03LjUsMy4zNTgtNy41LDcuNXYyNTANCgkJCWMwLDQuMTQyLDMuMzU3LDcuNSw3LjUsNy41aDMyLjV2MzIuNWMwLDQuMTQyLDMuMzU3LDcuNSw3LjUsNy41aDE3My4yM2M0LjE0MywwLDcuNS0zLjM1OCw3LjUtNy41di0yNTANCgkJCUMyNjYuNjE1LDQzLjM1OCwyNjMuMjU4LDQwLDI1OS4xMTUsNDB6IE01My4zODUsMTVoMTU4LjIzYzAsOC4zNDksMCwyMjYuMzIxLDAsMjM1Yy01LjU1OCwwLTE0Ny45NTIsMC0xNTguMjMsMA0KCQkJQzUzLjM4NSwyNTAsNTMuMzg1LDE1LDUzLjM4NSwxNXogTTI1MS42MTUsMjkwSDkzLjM4NXYtMjVoMTI1LjczYzQuMTQzLDAsNy41LTMuMzU4LDcuNS03LjVWNTVoMjVWMjkweiIvPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDojMjIzMTNGOyIgZD0iTTkyLjQ2NSw3OC43MTNoODAuMDdjNC4xNDMsMCw3LjUtMy4zNTgsNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjVoLTgwLjA3DQoJCQljLTQuMTQyLDAtNy41LDMuMzU4LTcuNSw3LjVDODQuOTY1LDc1LjM1NSw4OC4zMjIsNzguNzEzLDkyLjQ2NSw3OC43MTN6Ii8+DQoJCTxwYXRoIHN0eWxlPSJmaWxsOiMyMjMxM0Y7IiBkPSJNOTIuNDY1LDEyMi4yMTFoODAuMDdjNC4xNDMsMCw3LjUtMy4zNTgsNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjVoLTgwLjA3DQoJCQljLTQuMTQyLDAtNy41LDMuMzU4LTcuNSw3LjVTODguMzIyLDEyMi4yMTEsOTIuNDY1LDEyMi4yMTF6Ii8+DQoJCTxwYXRoIHN0eWxlPSJmaWxsOiMyMjMxM0Y7IiBkPSJNOTIuNDY1LDE2NS43MDloODAuMDdjNC4xNDMsMCw3LjUtMy4zNTgsNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjVoLTgwLjA3DQoJCQljLTQuMTQyLDAtNy41LDMuMzU4LTcuNSw3LjVTODguMzIyLDE2NS43MDksOTIuNDY1LDE2NS43MDl6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+"
            />
            <main className="!z-50 w-full flex flex-col items-center justify-center">
                <Header/>
                <div className="container">
                    <div className="grid grid-cols-12 gap-y-8 py-16 lg:gap-8 2xl:gap-20 2xl:py-20">
                        {children}
                        {weather}
                        {aqi}
                        {wind}
                        {temperature}
                    </div>
                </div>
            </main>
        </div>
    );
}