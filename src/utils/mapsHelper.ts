import { OnsenDestinationWithCoords } from '@/data/destinations';

/**
 * Generate Google Maps search URL
 * Priority: coordinates > full name search
 */
export function getGoogleMapsUrl(destination: OnsenDestinationWithCoords): string {
  if (destination.coordinates) {
    const { lat, lng } = destination.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  
  // Fallback: search by name + location
  const query = encodeURIComponent(`${destination.name} ${destination.location} Japan`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generate Google Maps directions URL from current location
 */
export function getDirectionsUrl(destination: OnsenDestinationWithCoords): string {
  if (destination.coordinates) {
    const { lat, lng } = destination.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  
  const query = encodeURIComponent(`${destination.name} ${destination.location} Japan`);
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}
