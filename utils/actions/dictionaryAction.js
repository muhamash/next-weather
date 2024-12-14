// "use server";

const { getDictionary } = require( "../dictionary" );

export const dictionaryAction = async ( value ) =>
{
    return await getDictionary( value );
}