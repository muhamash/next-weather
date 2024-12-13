import 'server-only';

const getLocationFile = {
    locationFile : ()=> import('../public/data/cities.json').then((module) => module.default),
}

export const getLocations = async () =>
{
    try
    {
        const data = await getLocationFile.locationFile();
        return data;
    }
    catch ( error )
    {
        console.error( 'Error loading video data:', error );
        throw error;
    }
};

export const getLocationByName = async location =>
{
    try
    {
        if ( !location ) return null;

        const locationData = await getLocations();
        const found = locationData.find(
            ( item ) => item.city_ascii.toLowerCase() === location.toLowerCase()
        );

        return found || null;
    }
    catch ( error )
    {
        console.error( 'Error loading video data:', error );
        throw error;
    }
};

// const getCsvFile = async () =>
// {
//     return  import( '../public/data/worldcities.csv' ).then( ( module ) => module.default );
// }import { getLocationByName } from '@/utils/functions';