"use client";

import { useLanguage } from '@/hooks/useLangugage';
import { getLocationLatLongList, getSearchLocations } from "@/utils/loactionInfo";
import { AnimatePresence, motion } from "framer-motion";
import debounce from "lodash.debounce";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from "react";

const LocationSwitcher = ({ initialLocations = [], initialTotalPages = 1 }) => {
    const [showLocationList, setShowLocationList] = useState(false);
    const [locations, setLocations] = useState(initialLocations);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [searchQuery, setSearchQuery] = useState("");

    const { currentLanguage } = useLanguage();
    const observer = useRef(null);
    const params = useParams();

    const fetchLocations = useCallback(async (query, pageNumber) => {
        setLoading(true);
        setError(null);

        try {
            if (pageNumber === 1 && query) {
                setLocations([]);
            }

            const response = query
                ? await getSearchLocations(query, pageNumber, 10)
                : await getLocationLatLongList(pageNumber, 10);

            if (response.status === 200) {
                setLocations((prev) =>
                    pageNumber === 1 ? response.data : [...prev, ...response.data]
                );
                setTotalPages(response.totalPages);
            } else {
                setError(response.message || "Failed to fetch locations");
            }
        } catch (err) {
            setError("Error fetching location data");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocations(searchQuery, page);
    }, [searchQuery, page, fetchLocations]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            setSearchQuery(query);
            setPage(1);
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const toggleLocationList = () => {
        setShowLocationList((prev) => {
            if (!prev && locations.length === 0) {
                fetchLocations("", 1);
            }
            return !prev;
        });
    };

    const lastLocationRef = useCallback(
        (node) => {
            if (loading || page >= totalPages) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, page, totalPages]
    );

    const locationListVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    // console.log(params)

    const isActive = ( location ) =>
    {
        if ( !params ) return false;

        const decodedCity = params.location ? decodeURIComponent( params.location ).toLowerCase() : "";
        const decodedCountry = params.country ? decodeURIComponent( params.country ).toLowerCase() : "";

        const locationCity = normalizeString( location.city_ascii.toLowerCase() );
        const locationCountry = normalizeString( location.country.toLowerCase() );

        return (
            normalizeString( decodedCity ) === locationCity &&
            normalizeString( decodedCountry ) === locationCountry
        );
    };

    return (
        <div className="relative">
            <button onClick={toggleLocationList}>
                <Image
                    className="shadow-sm rounded-md shadow-slate-600"
                    src="/search.png"
                    alt="link icon"
                    width={50}
                    height={50}
                />
            </button>

            <AnimatePresence>
                {showLocationList && (
                    <motion.div
                        className="absolute md:left-0 right-0 top-12 z-[999] rounded-md w-[200px] bg-slate-100 p-4 max-md:-translate-x-1/2 h-[250px] shadow-lg shadow-slate-500 overflow-y-auto mb-5"
                        variants={locationListVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        {/* Search field */}
                        <input
                          type="text"
                          className="w-[150px] p-1 mb-4 border rounded-md text-sm font-mono text-cyan-800"
                            placeholder="Search locations"
                            onChange={handleSearchChange}
                        />

                        {loading && locations.length === 0 && (
                            <div className="w-full flex items-center justify-center">
                                <div className="loaderLoaction" />
                            </div>
                        )}
                        {error && (
                            <div className="flex w-fit items-center justify-center flex-col gap-3">
                                <div className="searchLoader"></div>
                                <p className="text-red-500">{error}</p>
                            </div>
                        )}

                        {locations.length > 0 ? (
                            locations.map((location, index) => (
                                <Link
                                    href={`http://localhost:3000/${currentLanguage.value}/${location.country.toLowerCase()}/${location.city.toLowerCase()}`}
                                    className={`text-sm hover:bg-green-700 hover:text-white font-mono px-3 py-1 rounded-md cursor-pointer hover:shadow-md hover:shadow-slate-600 transition-all duration-200 block ${
                                        isActive(location)
                                            ? "bg-amber-600 text-white font-bold"
                                            : ""
                                    }`}
                                    key={index}
                                    ref={
                                        locations.length === index + 1
                                            ? lastLocationRef
                                            : null
                                    }
                                >
                                    {location.city}
                                </Link>
                            ))
                        ) : (
                            !loading &&
                            !error && (
                                <div className="w-full flex items-center justify-center">
                                    <div className="notFoundLoader" />
                                    <p className="text-md font-mono text-rose-600">
                                        No locations found
                                    </p>
                                </div>
                            )
                        )}

                        {loading && locations.length > 0 && (
                            <div className="w-full flex items-center justify-center">
                                <div className="loaderLoaction" />
                            </div>
                        )}
                        {page >= totalPages && !loading && !error && (
                            <p className="text-center text-sm font-semibold text-slate-500 mt-3">
                                No more data!!
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationSwitcher;
