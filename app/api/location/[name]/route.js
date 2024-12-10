import { getLocationByName } from "@/utils/functions";

export async function GET(requests, context) {
    try {
        const locationName = context?.params?.name;
        
        if (!locationName) {
            return new Response(JSON.stringify({
                status: 400,
                success: false,
                message: "Location name is required",
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const locationData = await getLocationByName(locationName);

        if (!locationData) {
            return new Response(JSON.stringify({
                status: 404,
                success: false,
                message: "Location not found",
            }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify({
            status: 200,
            success: true,
            message: "Location fetched successfully",
            data: locationData,
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching location:", error);
        return new Response(JSON.stringify({
            status: 500,
            success: false,
            message: `Failed to fetch location: ${error}`,
            error: error.message,
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}