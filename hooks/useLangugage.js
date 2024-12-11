'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useLanguage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const options = [
        { value: 'bn', label: 'বাং' },
        { value: 'en', label: 'En' },
    ];

    const segments = pathname.split('/').filter(Boolean);
    const currentLanguage = options.find((opt) => opt.value === segments[0]) || { value: 'en' };

    const updateLanguage = (newLang) => {
        const newSegments = [...segments];

        if (newSegments.length > 0 && options.some((opt) => opt.value === newSegments[0])) {
            newSegments[0] = newLang;
        } else {
            newSegments.unshift(newLang);
        }

        const queryParams = new URLSearchParams(searchParams.toString());
        const newPath = `/${newSegments.join('/')}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        // console.log(newPath);
        window.location.href = newPath;
    };

    return { currentLanguage, updateLanguage, options };
};