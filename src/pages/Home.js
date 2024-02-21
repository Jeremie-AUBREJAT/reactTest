import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BookmarksContext from "./BookmarksContext";
import Bookmarks from "./Bookmarks";





const Home = () => {
    const [searchText, setSearchText] = useState('');
    // On utilise un state pour garder nos données
    const [games, setGames] = useState([

    ]);
    
    const handleSearch = (e) => {
        e.preventDefault();
        const apiKey = '3faed8fd94894097841dbaf2fcfe33a3';
        // const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
        const url = "games-api-fallback/games/";
        fetch(url)
            .then(response => response.json())
            .then(data => { setGames(data.results) })
            .catch((e) => { alert('Une erreur est survenue :'+ e.message) })
    }

    
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);
    
    const addBookmarks = (game) => {
        if (isBookmarks(game.id)) {
            const index = bookmarks.indexOf(game);
            const tmpBookmarks = [...bookmarks];
            tmpBookmarks.splice(index,1);
            setBookmarks(tmpBookmarks);

        } else {
            const tmpBookmarks = [...bookmarks];
            tmpBookmarks.push(game);
            setBookmarks(tmpBookmarks);
        }
    }
    const isBookmarks = (id) =>
        !!(bookmarks.find((bookmark) => bookmark.id == id))

    return (
        <>
            <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2
text-2xl"onSubmit={handleSearch}>
                <input type="text" className="form-control" autoFocus={true}
                    onInput={e => { setSearchText(e.target.value) }}
                    value={searchText}
                    placeholder='Rechercher' />
                <button type="submit" className="bg-blue-700 rounded-r
text-white px-4 py-2">Rechercher</button>
                <Link to={'/bookmarks'}>Favoris</Link>

            </form>



            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {games.map(game => (
                    <li className="py-2 px-4 border-b border-gray-500
flex" key={game.id}>
                        <Link to={`/details/${game.slug}`} className="flex">
                            <img src={game.background_image} alt="" className="w-24 pr-2" />
                            <div className="text-2xl font-bold flex-grow">
                                {game.name}</div>
                            <div>{game.rating}</div>

                            <button onClick={(e) => { e.preventDefault(); addBookmarks(game) }}>

                                {isBookmarks(game.id) ? "★" : "☆"}
                            </button>
                            
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="ml-80 text-center
             w-20 border-2 border-gray-800 rounded-xl">
            <Link to={'/MyShop'}>Magasin</Link>
            </div>
        </>
    );
}
export default Home;