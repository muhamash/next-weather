import LocationDetector from "@/components/LocationDitector";
import SuspenseLoader from "@/components/SuspenseLoader";
import { Suspense } from 'react';

export default function Home() {
  return <Suspense fallback={
    <SuspenseLoader/>
  }>
    <LocationDetector />
  </Suspense>;
};