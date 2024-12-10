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
                    console.log('Geolocation successful:', position.coords);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('latitude', position.coords.latitude);
                    params.set('longitude', position.coords.longitude);

                    setLoading(false);
                    router.push(`/current?${params.toString()}`);
                },
                (geoError) => {
                    console.error('Geolocation error:', geoError);
                    setError('Failed to retrieve your location. Please try again.');
                    setLoading(false);
                }
            );
        };

        detectLocation();
    }, [searchParams, router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-slate-700 text-white">
            {loading && (
                <>
                    <div className="geoLocationFind" />
                    <p className="text-4xl text-center p-2 font-mono">Detecting Location...</p>
                </>
            )}
            {error && (
                <p className="text-xl text-red-500 text-center mt-4">{error}</p>
            )}
        </div>
    );
};

export default LocationDetector;