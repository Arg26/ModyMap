const stopWords = [

    "take",
    "me",
    "to",
    "show",
    "find",
    "navigate",
    "go",
    "please",
    "nearest",
    "where",
    "is",
    "the",
    "a",
    "an",
    "towards"

];

const aliases = {

    cafe: "cafeteria",
    cafeteria: "cafeteria",
    canteen: "cafeteria",
    food: "cafeteria",
    mess: "mess",

    admin: "administration",
    office: "administration",
    admission: "admission",
    accounts: "accounts",
    cdc: "cdc",

    clinic: "clinic",
    medical: "clinic",
    hospital: "clinic",
    doctor: "clinic",

    library: "library",
    books: "library",

    hostel: "hostel",
    dorm: "hostel",

    gym: "gym",

    reception: "reception",

    auditorium: "auditorium",

    basketball: "basketball",
    football: "football",
    hockey: "hockey",
    tennis: "tennis",

    workshop: "workshop",

    lake: "lake",

    gazebo: "gazebo",

    temple: "tapovan",

};

function normalize(text = "") {

    let value = text.toLowerCase();

    value = value.replace(/[^\w\s]/g, " ");

    let words = value.split(/\s+/);

    words = words.filter(word => !stopWords.includes(word));

    value = words.join(" ").trim();

    Object.entries(aliases).forEach(([key, replacement]) => {

        value = value.replaceAll(key, replacement);

    });

    return value;

}

export function searchBuilding(query, buildings) {

    if (!query || !Array.isArray(buildings)) {

        return null;

    }

    const search = normalize(query);

    for (const building of buildings) {

        const name = normalize(building.name || "");

        if (name.includes(search) || search.includes(name)) {

            return building;

        }

    }

    for (const building of buildings) {

        const category = normalize(building.category || "");

        if (category.includes(search) || search.includes(category)) {

            return building;

        }

    }

    for (const building of buildings) {

        const description = normalize(building.description || "");

        if (description.includes(search)) {

            return building;

        }

    }

    const words = search.split(" ");

    for (const word of words) {

        for (const building of buildings) {

            const name = normalize(building.name || "");

            if (name.includes(word)) {

                return building;

            }

        }

    }

    return null;

}