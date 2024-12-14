"use client";
import { useLanguage } from "@/hooks/useLangugage";
import { dictionaryAction } from "@/utils/actions/dictionaryAction";
import { use } from "react";

const Heading = ( { data } ) =>
{
    const { currentLanguage } = useLanguage();

    const language = use( dictionaryAction( currentLanguage.value ) );

    // console.log( language );

    return <h6 className="feature-name">{ language?.home[data] }</h6>;
};

export default Heading;