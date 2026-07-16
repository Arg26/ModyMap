import { useEffect, useState } from "react";
import api from "../services/api";

export default function useBuildings() {
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBuildings = async () => {
        try {
            setLoading(true);

            const response = await api.get("/buildings");
            console.log(response.data);
            console.log(response.data[0]);

            setBuildings(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch buildings:", err);

            setError(
                err.response?.data?.message ||
                    "Unable to load buildings."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuildings();
    }, []);

    return {
        buildings,
        loading,
        error,
        refreshBuildings: fetchBuildings,
    };
}