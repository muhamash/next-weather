import { getLocations } from "@/utils/functions";

export async function GET() {
    try {
        const locationData = await getLocations();
        return new Response( JSON.stringify( {
            status: 200,
            success: true,
            message: "Locations fetched successfully",
            data: locationData,
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return new Response( JSON.stringify( {
            status: 500,
            success: false,
            message: `Failed to fetch locations: ${error}`,
            error: error.message,
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}