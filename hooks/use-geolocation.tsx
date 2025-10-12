"use client";

import { useState, useEffect } from "react";

interface GeolocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation not supported",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          const data = await response.json();

          setLocation({
            latitude,
            longitude,
            city:
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Unknown",
            country: data.address?.country || "Unknown",
            loading: false,
            error: null,
          });
        } catch (error) {
          setLocation({
            latitude,
            longitude,
            loading: false,
            error: "Failed to get location name",
          });
        }
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    );
  }, []);

  return location;
}
