'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LocationDetector = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const detectLocation = () => {
            if (!navigator.geolocation) {
                console.error('Geolocation is not supported by your browser.');
                setError('Geolocation is not supported by your browser.');
                setLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Geolocation successful:', { latitude, longitude });
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('latitude', latitude);
                    params.set('longitude', longitude);

                    setLoading(false);
                    router.push(`/current?${params.toString()}`);
                },
                (geoError) => {
                    console.error('Geolocation error:', geoError);
                    setError('Failed to retrieve your location. Please ensure location services are enabled.');
                    setLoading(false);
                }
            );
        };

        detectLocation();
    }, [searchParams, router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-slate-700 text-white">
            {loading ? (
                <>
                    <div className="geoLoader"></div>
                    <p className="text-md font-mono text-amber-600 font-semibold mt-5">Detecting your location...</p>
                </>
            ) : error ? (
                <p className="text-xl text-red-500 text-center mt-4">{error}</p>
            ) : (
                        <>
                            <div className="geoLocationFind"></div>
                            <span className="textLoader">Load&nbsp;ng</span>
                        </>
            )}
        </div>
    );
};

export default LocationDetector;