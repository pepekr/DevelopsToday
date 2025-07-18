import { useNavigate, Link } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/logout`, {
            credentials: "include",
            method: "POST",
        });
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 shadow-md flex items-center justify-between gap-4">
            <Link to="/" className="font-bold text-white hover:underline ">
                Home
            </Link>
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
                Logout
            </button>
        </nav>
    );
}
