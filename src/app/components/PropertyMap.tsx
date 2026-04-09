import { useEffect, useRef } from "react";
import L from "leaflet";
import { Listing } from "../data/mockData";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  listings: Listing[];
  selectedListingId?: string;
  onMarkerClick?: (listingId: string) => void;
}

export function PropertyMap({
  listings,
  selectedListingId,
  onMarkerClick,
}: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return undefined;
    }

    const map = L.map(containerRef.current).setView([51.0447, -114.0719], 12);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    listings.forEach((listing) => {
      const isSelected = selectedListingId === listing.id;
      const borderColor = isSelected ? "#1d4ed8" : "#2563eb";

      const customIcon = L.divIcon({
        className: "custom-property-marker",
        html: `
          <div style="position: relative; width: 80px; cursor: pointer;">
            <div style="
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              overflow: hidden;
              border: 3px solid ${borderColor};
              transform: translateY(-50%);
            ">
              <img
                src="${listing.images[0]}"
                style="
                  width: 80px;
                  height: 60px;
                  object-fit: cover;
                  display: block;
                "
                alt="${listing.address}"
              />
              <div style="
                padding: 6px 8px;
                background: white;
                text-align: center;
              ">
                <div style="
                  font-weight: 700;
                  font-size: 13px;
                  color: #111827;
                  white-space: nowrap;
                ">
                  $${(listing.price / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
            <div style="
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid ${borderColor};
            "></div>
          </div>
        `,
        iconSize: [80, 80],
        iconAnchor: [40, 80],
        popupAnchor: [0, -80],
      });

      const marker = L.marker([listing.lat, listing.lng], {
        icon: customIcon,
      }).addTo(mapRef.current!);

      marker.bindPopup(
        `
          <div style="min-width: 250px; font-family: system-ui, -apple-system, sans-serif;">
            <img
              src="${listing.images[0]}"
              style="
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 12px;
              "
              alt="${listing.address}"
            />
            <div style="font-weight: 700; font-size: 20px; margin-bottom: 8px; color: #111827;">
              $${listing.price.toLocaleString()}
            </div>
            <div style="font-size: 14px; color: #4b5563; margin-bottom: 4px;">
              ${listing.address}
            </div>
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">
              ${listing.community}
            </div>
            <div style="
              font-size: 13px;
              color: #374151;
              padding: 8px 0;
              border-top: 1px solid #e5e7eb;
              margin-top: 8px;
            ">
              ${listing.beds} beds | ${listing.baths} baths | ${listing.sqft.toLocaleString()} sqft
            </div>
            <a
              href="/property/${listing.id}"
              style="
                font-size: 14px;
                font-weight: 600;
                color: #2563eb;
                margin-top: 8px;
                display: inline-block;
                text-decoration: none;
                padding: 8px 16px;
                background: #eff6ff;
                border-radius: 6px;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
              "
              onmouseover="this.style.background='#dbeafe'"
              onmouseout="this.style.background='#eff6ff'"
            >
              View Full Details ->
            </a>
          </div>
        `,
        {
          maxWidth: 280,
          className: "custom-property-popup",
        },
      );

      if (onMarkerClick) {
        marker.on("click", () => {
          onMarkerClick(listing.id);
        });
      }

      markersRef.current.push(marker);
    });

    if (listings.length > 0) {
      const bounds = L.latLngBounds(
        listings.map((listing) => [listing.lat, listing.lng] as [number, number]),
      );
      mapRef.current.fitBounds(bounds, { padding: [24, 24] });
    } else {
      mapRef.current.setView([51.0447, -114.0719], 12);
    }
  }, [listings, onMarkerClick, selectedListingId]);

  return (
    <>
      <style>
        {`
          .custom-property-marker {
            background: transparent !important;
            border: none !important;
          }

          .custom-property-popup .leaflet-popup-content-wrapper {
            padding: 12px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          }

          .custom-property-popup .leaflet-popup-content {
            margin: 0;
            width: auto !important;
          }

          .custom-property-popup .leaflet-popup-tip {
            background: white;
            box-shadow: 0 3px 14px rgba(0,0,0,0.1);
          }

          .custom-property-marker:hover {
            z-index: 1000 !important;
          }
        `}
      </style>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
        className="z-0"
      />
    </>
  );
}
