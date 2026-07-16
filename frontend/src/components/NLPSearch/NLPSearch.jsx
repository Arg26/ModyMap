import { useState } from "react";
import "./NLPSearch.css";

import { searchBuilding } from "../../services/nlpService";

export default function NLPSearch({

    buildings,

    onSelectBuilding,

}) {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSearch() {

        if (!query.trim()) return;

        console.clear();

        console.log("========== NLP DEBUG ==========");
        console.log("Query:", query);
        console.log("Total Buildings:", buildings.length);
        console.log("First Building:", buildings[0]);

        setLoading(true);

        const result = searchBuilding(query, buildings);

        setLoading(false);

        console.log("Matched Result:", result);

        if (result) {

            console.log("Building Selected");

            onSelectBuilding(result);

        }

        else {

            console.log("No Match Found");

            alert("No matching location found.");

        }

    }

    function handleKeyDown(e){

        if(e.key==="Enter"){

            handleSearch();

        }

    }

    return (

        <div className="nlp-search">

            <h3>AI Search</h3>

            <p>Search naturally like Google Maps</p>

            <div className="nlp-input">

                <input

                    type="text"

                    value={query}

                    placeholder="e.g. Take me to Library"

                    onChange={(e)=>setQuery(e.target.value)}

                    onKeyDown={handleKeyDown}

                />

                <button

                    onClick={handleSearch}

                    disabled={loading}

                >

                    {loading ? "..." : "AI"}

                </button>

            </div>

        </div>

    );

}