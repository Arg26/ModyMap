import { useEffect, useState } from "react";

export default function useUserLocation() {

    const [location, setLocation] = useState(null);

    const [heading, setHeading] = useState(0);

    const [speed, setSpeed] = useState(0);

    const [accuracy, setAccuracy] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        if (!navigator.geolocation) {

            setError("Geolocation is not supported.");

            setLoading(false);

            return;

        }

        const watchId = navigator.geolocation.watchPosition(

            (position) => {

                setLocation([

                    position.coords.latitude,

                    position.coords.longitude,

                ]);

                setHeading(position.coords.heading || 0);

                setSpeed(position.coords.speed || 0);

                setAccuracy(position.coords.accuracy);

                setLoading(false);

                setError(null);

            },

            (err) => {

                console.error(err);

                setError(err.message);

                setLoading(false);

            },

            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 1000,

            }

        );

        return () => {

            navigator.geolocation.clearWatch(watchId);

        };

    }, []);

    return {

        currentLocation: location,

        heading,

        speed,

        accuracy,

        loading,

        error,

    };

}