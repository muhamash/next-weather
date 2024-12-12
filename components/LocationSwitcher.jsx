"use client";

import { getLocationLatLongList } from "@/utils/loactionInfo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const LocationSwitcher = () => {
    const [showLocationList, setShowLocationList] = useState(false);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const observer = useRef();

    // Fetch locations
    const fetchLocations = async (pageNumber) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getLocationLatLongList(pageNumber, 10);
            if (response.status === 200) {
                setLocations((prev) => [...prev, ...response.data]);
                setTotalPages(response.totalPages);
            } else {
                setError(response.message || "Failed to fetch locations");
            }
        } catch (err) {
            setError("Error fetching location data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle button click
    const toggleLocationList = () => {
        setShowLocationList((prev) => !prev);
        if (locations.length === 0 && !loading) {
            fetchLocations(1); // Fetch first page initially
        }
    };

    // Infinite scrolling logic
    const lastLocationRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && page < totalPages) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, page, totalPages]
    );

    // Fetch on page change
    useEffect(() => {
        if (page > 1) fetchLocations(page);
    }, [page]);

    // Filter locations based on search query
    const filteredLocations = locations.filter((location) =>
        location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const locationListVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <div className="relative">
            <button onClick={toggleLocationList}>
                <Image
                    className={`shadow-sm rounded-md shadow-slate-600
                    `}
                    src="/search.png"
                    alt="link icon"
                    width={50}
                    height={50}
                />
            </button>

            <AnimatePresence>
                {showLocationList && (
                    <motion.div
                        className="absolute left-0 top-12 z-[999] rounded-md md:w-[200px] bg-slate-100 p-4 max-md:-translate-x-1/2 h-[250px] shadow-lg shadow-slate-500 overflow-y-auto mb-5"
                        variants={locationListVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        {/* Search field */}
                        <input
                            type="text"
                            className="w-full p-2 mb-4 border rounded-md"
                            placeholder="Search locations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {loading && locations.length === 0 && (
                            <div className="w-full flex items-center justify-center">
                                <div className="loaderLoaction" />
                            </div>
                        )}
                        {error && <p className="text-red-500">{error}</p>}
                        {filteredLocations.length > 0 ? (
                            filteredLocations.map((location, index) => (
                                <p
                                    className="text-sm hover:bg-green-700 hover:text-white font-mono px-3 py-1 rounded-md cursor-pointer hover:shadow-md hover:shadow-slate-600 transition-all duration-200"
                                    key={index}
                                    ref={
                                        filteredLocations.length === index + 1
                                            ? lastLocationRef
                                            : null
                                    }
                                >
                                    {location.city}
                                </p>
                            ))
                        ) : (
                            !loading && !error && (
                                <div className="w-full flex items-center justify-center">
                                    <p className="text-md font-mono text-rose-600">
                                        No locations found
                                    </p>
                                </div>
                            )
                        )}
                        {loading && filteredLocations.length > 0 && (
                            <div className="w-full flex items-center justify-center">
                                <div className="loaderLoaction" />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationSwitcher;