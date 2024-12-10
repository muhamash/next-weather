import { locationData } from "@/public/data/database";

function getLocations ()
{
    return locationData;
}

function getLocationByName(location) {
    if (!location) return null;

    const found = locationData.find(
        (item) => item.location.toLowerCase() === location.toLowerCase()
    );

    return found || null;
}

export { getLocationByName, getLocations };