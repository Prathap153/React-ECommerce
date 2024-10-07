import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import "./navbar.css";

const Navbar = ({ categoryList }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const handleSearch = () => {
        const seacrhByCategory = search.toLowerCase().trim();
        navigate(`/category/${seacrhByCategory}`);
        setSearch('');
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Products</Link>
                </li>
                <li 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                    className="category-text"
                >
                  Category
                    {isDropdownOpen && (
                        <div className="dropdown">
                                {categoryList.map((category, index) => (
                                    <li key={index}>
                                     <Link to = {`/category/${category}`}>{category}</Link>
                                    </li>
                                ))}
                        </div>
                    )}
                </li>
                <li className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="button-search"onClick={handleSearch}>Search</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
