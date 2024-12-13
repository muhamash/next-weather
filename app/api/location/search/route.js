import { getLocations } from "@/utils/functions";

// export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const query = searchParams.get("query");

  try {
    const allLocations = await getLocations();
    const startIndex = (page - 1) * limit;

    const filteredLocations = allLocations.filter((location) =>
      location.city_ascii.toLowerCase().includes(query.toLowerCase())
    );

    // pagination to filtered locations
    const paginatedLocations = filteredLocations.slice(startIndex, startIndex + limit);

    return new Response(
      JSON.stringify({
        status: 200,
        success: true,
        data: paginatedLocations,
        currentPage: page,
        totalPages: Math.ceil(filteredLocations.length / limit),
        message: "Locations fetched successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching locations:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        success: false,
        message: `Failed to fetch locations: ${error}`,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};