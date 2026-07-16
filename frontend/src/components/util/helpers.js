/**
 * Filter buildings by category
 */
export function filterBuildingsByCategory(
    buildings,
    category
) {
    if (
        !category ||
        category === "All"
    ) {
        return buildings;
    }

    return buildings.filter(
        (building) =>
            building.category === category
    );
}

/**
 * Search buildings
 */
export function searchBuildings(
    buildings,
    query
) {
    if (!query.trim()) {
        return buildings;
    }

    const search = query.toLowerCase();

    return buildings.filter((building) =>
        building.name
            .toLowerCase()
            .includes(search)
    );
}

/**
 * Find building by ID
 */
export function findBuildingById(
    buildings,
    id
) {
    return (
        buildings.find(
            (building) =>
                building.id === id
        ) || null
    );
}

/**
 * Format contact number
 */
export function formatContact(contact) {
    return contact || "N/A";
}

/**
 * Format email
 */
export function formatEmail(email) {
    return email || "N/A";
}

/**
 * Capitalize text
 */
export function capitalize(text) {
    if (!text) return "";

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );
}

/**
 * Build image path
 */
export function getImagePath(imageUrl) {
    if (!imageUrl) {
        return "https://placehold.co/600x350?text=ModyMap";
    }

    return `/${imageUrl}`;
}

/**
 * Calculate straight-line distance (km)
 */
export function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {
    const R = 6371;

    const dLat =
        ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
        ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return (R * c).toFixed(2);
}