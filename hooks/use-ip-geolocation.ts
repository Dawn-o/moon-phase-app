"use client";

import { useState, useEffect } from "react";

interface IPGeolocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  loading: boolean;
  error: string | null;
}

export function useIPGeolocation() {
  const [location, setLocation] = useState<IPGeolocationData>({
    latitude: 0,
    longitude: 0,
    city: "Unknown",
    country: "Unknown",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/geolocation");

        if (!response.ok) {
          throw new Error("Failed to fetch location");
        }

        const data = await response.json();

        setLocation({
          latitude: parseFloat(data.latitude) || 0,
          longitude: parseFloat(data.longitude) || 0,
          city: data.city || "Unknown",
          country: data.country || "Unknown",
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Geolocation error:", error);
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to detect location",
        }));
      }
    };

    fetchLocation();
  }, []);

  return location;
}
