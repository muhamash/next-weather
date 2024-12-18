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
            `${process.env.NEXT_PUBLIC_API_URL}/location/search?query=${query}&page=${page}&limit=${limit}`
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
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/location?page=${page}&limit=${limit}`
        );

        if ( !response.status === 200 )
        {
            console.error( "Server responded with an error:", response.status, response.statusText );
            throw new Error( `HTTP error: ${response.status} ${response.statusText}` );
        }

        const data = await response.json();
        return data;

    } catch ( e )
    {
        console.error( "Error fetching paginated data:", e.message );
        console.error( "Stack trace:", e.stack );
        
        if ( e instanceof SyntaxError )
        {
            console.error( "Response is not valid JSON. Ensure the API returns JSON." );
        }

        throw new Error( "Unable to fetch locations" );
    }
};

export const getLocationLatLong = async (locationName) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/location/search?query=${locationName}`
        );
        const data = await response.json();
        // console.log(data)
        return data;
    } catch (e) {
        console.error(e.message);
    }
};

export const getResolvedLatLong = async (params, lat, lon) => {
    if (lat && lon) {
        return { lat, lon };
    }

    function normalizeString(str) {
        return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '');
    };

    const decodedLocation = normalizeString(decodeURIComponent(params.location).toLowerCase());
    const decodedCountry = normalizeString(decodeURIComponent(params.country).toLowerCase());
    const locationLatlon = await getLocationLatLong(decodedLocation);

    if (locationLatlon?.data) {
        const data = locationLatlon?.data?.find(
            (location) =>
                normalizeString(decodeURIComponent(location.city_ascii).toLowerCase()) === decodedLocation &&
                normalizeString(decodeURIComponent(location.country).toLowerCase()) === decodedCountry
        );

        if (data) {
            return { lat: data?.lat, lon: data?.lng };
        }
    }

    return null; 
};