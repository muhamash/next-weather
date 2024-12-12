"use client";

import { getLocationLatLongList } from "@/utils/loactionInfo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LocationSwitcher = ({ data }) => {
    const [showLocationList, setShowLocationList] = useState(false);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        async function getLocationList() {
            const locationList = await getLocationLatLongList();
            setLocations(locationList);
        }

        getLocationList();
    }, []);

    const locationListVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <div className="relative">
            <button onClick={() => setShowLocationList(!showLocationList)}>
                <Image
                    className="size-9"
                    src="/link.svg"
                    alt="link icon"
                    width={36}
                    height={36}
                />
            </button>

            <AnimatePresence>
                {showLocationList && (
                    <motion.div
                        className="absolute left-0 top-12 z-[999] w-full min-w-[280px] rounded-md bg-white p-4 shadow max-md:-translate-x-1/2"
                        variants={locationListVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <ul
                            role="list"
                            className="divide-y divide-gray-100 [&>*]:py-2 [&>li]:cursor-pointer"
                        >
                            {locations.data.map((info) => (
                                <li
                                    className="hover:bg-green-700 rounded-md p-2"
                                    key={info.location}
                                >
                                    <Link
                                        href={`/${info.location}?latitude=${info.latitude}&longitude=${info.longitude}`}
                                    >
                                        {info.location}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationSwitcher;
