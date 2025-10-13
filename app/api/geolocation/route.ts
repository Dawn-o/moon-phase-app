import { geolocation } from "@vercel/functions";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const geo = geolocation(request);

  const timezone = geo.city
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "UTC";

  return Response.json({
    city: geo.city || "Unknown",
    country: geo.country || "Unknown",
    latitude: geo.latitude || "0",
    longitude: geo.longitude || "0",
    timezone: timezone,
  });
}
