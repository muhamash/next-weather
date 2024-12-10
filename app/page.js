import LocationDetector from "@/components/LocationDitector";
import { Suspense } from 'react';

export default function Home() {
  return <Suspense>
    <LocationDetector />
  </Suspense>;
};
