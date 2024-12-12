import { getLocations } from "@/utils/functions";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    try {
        const allLocations = await getLocations();
        const startIndex = (page - 1) * limit;
        const paginatedLocations = allLocations.slice(startIndex, startIndex + limit);

        return new Response(JSON.stringify({
            status: 200,
            success: true,
            message: "Locations fetched successfully",
            data: paginatedLocations,
            currentPage: page,
            totalPages: Math.ceil(allLocations.length / limit),
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                // "Cache-Control": "public, max-age=600, stale-while-revalidate=60",
            },
        });
    } catch (error) {
        console.error("Error fetching locations:", error);
        return new Response(JSON.stringify({
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