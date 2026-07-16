import "./Directory.css";

const categories = [
    "All",
    "Academic Building",
    "Administration",
    "Hostel",
    "Food & Beverages",
    "Sports Arena",
    "Auditoriums",
    "Medics",
    "Temple",
    "Others",
];

export default function Directory({
    selectedCategory = "All",
    onCategorySelect,
}) {
    return (
        <div className="directory">
            <h3 className="directory-title">
                Categories
            </h3>

            <div className="category-list">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-chip ${
                            selectedCategory === category
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            onCategorySelect(category)
                        }
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}