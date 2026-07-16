import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Button from "../Common/Button";
import {
    getCurrentUser,
    isAuthenticated,
    logout,
} from "../../services/auth";

export default function Header({

    onLocateMe,

    mapType,
    setMapType,

    theme,
    setTheme,

}) {

    const navigate = useNavigate();

    const authenticated = isAuthenticated();

    const user = getCurrentUser();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <header className={`header ${theme}`}>

            <div className="header-left">

                <div className="logo-circle">

                    M

                </div>

                <div className="logo-text">

                    <h1>ModyMap</h1>

                    <p>Campus Navigation System</p>

                </div>

            </div>

            <div className="header-center">

                <Button

                    variant="secondary"

                    onClick={onLocateMe}

                >

                    📍 Live Location

                </Button>

                <button

                    className={
                        mapType === "street"
                            ? "map-btn active"
                            : "map-btn"
                    }

                    onClick={() => setMapType("street")}

                >

                    🗺 Map

                </button>

                <button

                    className={
                        mapType === "satellite"
                            ? "map-btn active"
                            : "map-btn"
                    }

                    onClick={() => setMapType("satellite")}

                >

                    🛰 Satellite

                </button>

                <button

                    className="map-btn"

                    onClick={() =>

                        setTheme(

                            theme === "light"

                                ? "dark"

                                : "light"

                        )

                    }

                >

                    {

                        theme === "light"

                            ? "🌙 Dark"

                            : "☀ Light"

                    }

                </button>

            </div>

            <div className="header-right">

                {

                    !authenticated ?

                        <>

                            <Link to="/login">

                                <Button variant="outline">

                                    Login

                                </Button>

                            </Link>

                            <Link to="/register">

                                <Button>

                                    Register

                                </Button>

                            </Link>

                        </>

                        :

                        <>

                            <div className="profile-chip">

                                <div className="avatar">

                                    {

                                        user?.name

                                            ?.charAt(0)

                                            ?.toUpperCase() || "U"

                                    }

                                </div>

                                <span>

                                    {

                                        user?.name ||

                                        "User"

                                    }

                                </span>

                            </div>

                            <Button

                                variant="danger"

                                onClick={handleLogout}

                            >

                                Logout

                            </Button>

                        </>

                }

            </div>

        </header>

    );

}