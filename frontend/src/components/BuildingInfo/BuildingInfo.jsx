import "./BuildingInfo.css";

export default function BuildingInfo({

    building,

    onNavigate,

    onClose,

}) {

    if (!building) {

        return (

            <div className="building-info empty">

                <h3>

                    Select a Building

                </h3>

                <p>

                    Choose any building to view details.

                </p>

            </div>

        );

    }

    const{

        name,

        imageUrl,

        category,

        description,

        timing,

        email,

        contacts,

    }=building;

    return(

        <div className="building-info">

            <div className="building-header">

                <h2>

                    {name}

                </h2>

                <button

                    className="close-btn"

                    onClick={onClose}

                >

                    ×

                </button>

            </div>

            <div className="building-image-container">

                <img

                    src={

                        imageUrl

                        ? `/${imageUrl}`

                        : "https://placehold.co/600x350?text=ModyMap"

                    }

                    alt={name}

                    className="building-image"

                />

            </div>

            <div className="building-category">

                {category}

            </div>

            <div className="building-description">

                <p>

                    {description || "No description available."}

                </p>

            </div>

            <div className="building-details">

                <div className="detail-item">

                    <span className="label">

                        Timings

                    </span>

                    <span>

                        {timing || "N/A"}

                    </span>

                </div>

                <div className="detail-item">

                    <span className="label">

                        Email

                    </span>

                    <span>

                        {email || "N/A"}

                    </span>

                </div>

                <div className="detail-item">

                    <span className="label">

                        Contact

                    </span>

                    <span>

                        {contacts || "N/A"}

                    </span>

                </div>

            </div>

            <button

                className="navigate-btn"

                onClick={()=>onNavigate(building)}

            >

                🧭 Navigate Here

            </button>

        </div>

    );

}