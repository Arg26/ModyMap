import { useEffect, useMemo, useRef, useState } from "react";
import "./SearchBox.css";

export default function SearchBox({
    label,
    buildings,
    selected,
    currentLocation,
    onSelectBuilding,
}) {

    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef(null);

    useEffect(() => {

        if (selected) {
            setQuery(selected.name);
        } else {
            setQuery("");
        }

    }, [selected]);

    const filteredBuildings = useMemo(() => {

        if (!query.trim()) return buildings;

        return buildings.filter((building) =>
            building.name.toLowerCase().includes(query.toLowerCase())
        );

    }, [query, buildings]);

    function handleSelect(building) {

        setQuery(building.name);
        setShowResults(false);
        setActiveIndex(-1);

        onSelectBuilding(building);

    }

    function handleCurrentLocation() {

        if (!currentLocation) return;

        setQuery("📍 Your Location");

        setShowResults(false);

        setActiveIndex(-1);

        onSelectBuilding({
            id: "CURRENT_LOCATION",
            name: "📍 Your Location",
            latitude: currentLocation[0],
            longitude: currentLocation[1],
            isCurrentLocation: true,
        });

    }

    function clearSearch() {

        setQuery("");
        setShowResults(false);
        setActiveIndex(-1);

        onSelectBuilding(null);

        inputRef.current?.focus();

    }

    function handleKeyDown(e) {

        const totalItems =
            filteredBuildings.length + (currentLocation ? 1 : 0);

        if (!totalItems) return;

        if (e.key === "ArrowDown") {

            e.preventDefault();

            setActiveIndex((prev) =>
                prev < totalItems - 1 ? prev + 1 : 0
            );

        }

        else if (e.key === "ArrowUp") {

            e.preventDefault();

            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : totalItems - 1
            );

        }

        else if (e.key === "Enter") {

            e.preventDefault();

            if (activeIndex === 0 && currentLocation) {

                handleCurrentLocation();

            }

            else {

                const building =
                    filteredBuildings[
                        currentLocation
                            ? activeIndex - 1
                            : activeIndex
                    ];

                if (building) {
                    handleSelect(building);
                }

            }

        }

        else if (e.key === "Escape") {

            setShowResults(false);

        }

    }

    return (

        <div className="search-box">

            <label className="search-label">

                {label}

            </label>

            <div className="search-input-wrapper">

                <span className="search-icon">

                    🔍

                </span>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    placeholder={`Select ${label}`}
                    onChange={(e) => {

                        setQuery(e.target.value);

                        setShowResults(true);

                    }}
                    onFocus={() => setShowResults(true)}
                    onKeyDown={handleKeyDown}
                />

                {query && (

                    <button
                        className="clear-btn"
                        onClick={clearSearch}
                    >
                        ×
                    </button>

                )}

            </div>

            {

                showResults && (

                    <ul className="search-results">

                        {

                            currentLocation && (

                                <li
                                    className={
                                        activeIndex === 0
                                            ? "active current-location-item"
                                            : "current-location-item"
                                    }
                                    onClick={handleCurrentLocation}
                                >

                                    <span className="building-name">

                                        📍 Your Location

                                    </span>

                                    <span className="building-category">

                                        Use GPS Position

                                    </span>

                                </li>

                            )

                        }

                        {

                            filteredBuildings.map((building, index) => (

                                <li
                                    key={building.id}
                                    className={
                                        activeIndex ===
                                        (currentLocation
                                            ? index + 1
                                            : index)
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => handleSelect(building)}
                                >

                                    <span className="building-name">

                                        {building.name}

                                    </span>

                                    <span className="building-category">

                                        {building.category}

                                    </span>

                                </li>

                            ))

                        }

                    </ul>

                )

            }

        </div>

    );

}