export const getLocationData = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
        );
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e.message);
    }
};

export const getLocationLatLongList = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/location`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e.message);
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
    // console.log( locationLatlong.data );

    if ( locationLatlong?.data?.latitude && locationLatlong?.data?.longitude )
    {
        const lat = locationLatlong.data.latitude;
        const lon = locationLatlong.data.longitude;
        
        return { lat, lon };
    }
};