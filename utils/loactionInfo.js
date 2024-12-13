export const getLocationData = async (lat, lon) => {
    try {
        const response = await fetch(
            // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`

            `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
        );
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (e) {
        console.error(e.message);
    }
};

export const getSearchLocations = async ( query, page, limit = 10 ) =>
{
    try {
        const response = await fetch(
            `http://localhost:3000/api/location/search?query=${query}&page=${page}&limit=${limit}`
        );
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (e) {
        console.error(e.message);
    }
}

export const getLocationLatLongList = async ( page, limit = 10 ) =>
{
    try
    {
        const response = await fetch( `http://localhost:3000/api/location?page=${page}&limit=${limit}` );
        const data = await response.json();
        return data;
    } catch ( e )
    {
        console.error( "Error fetching paginated data:", e.message );
        throw new Error( "Unable to fetch locations" );
    }
};

export const getLocationLatLong = async (locationName) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/location/${locationName}`
        );
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e.message);
    }
};

export const getResolvedLatLong = async ( location, lat, lon ) =>
{
    console.log( location, lat, lon );
    if ( lat && lon )
    {
        return { lat, lon };
    }

    const locationLatlong = await getLocationLatLong( location );
    // console.log( locationLatlong.data.lat, location );

    if ( locationLatlong?.data )
    {
        const lon = locationLatlong.data.lng;
        const lat = locationLatlong.data.lat;

        return { lat, lon };
    }
};