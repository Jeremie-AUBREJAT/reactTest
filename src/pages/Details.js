import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Details = () => {
    const { slug } = useParams();
    const [game, setGame] = useState({});
    useEffect(() => {
        const apiKey = '3faed8fd94894097841dbaf2fcfe33a3';
        // const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
        const url = "game-api-fallback/games/"+slug;

        fetch(url)
            .then(response => response.json())
            .then(data => { 
                setGame(data); 
            })
            .catch((e) => { 
                alert('Une erreur est survenue', e); 
            });

    }, [slug]);

    return (
        <>
        <h1>Ceci est la plage de {game.name}</h1>
        <img src={game.background_image} alt=""/>
        <div>{game.description_raw}</div>
        </>
    );

};
export default Details;