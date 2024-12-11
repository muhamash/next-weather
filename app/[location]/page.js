import SuspenseLoader from "@/components/SuspenseLoader";
import { Suspense } from "react";

export default function LocationPage() {
    return (
        <Suspense fallback={
            <SuspenseLoader/>
        }>
            <div>
                Location page
            </div>
        </Suspense>
    );
}
