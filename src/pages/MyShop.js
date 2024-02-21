import React, { useState, useEffect } from "react";
import haversine from "./haversine.js";

const MyShop = () => {
    const [myShop, setMyShop] = useState({name:"",distance:""});

    useEffect(() => {
        const url = "https://formacitron.github.io/shopslist/shops.json";
        fetch(url)
            .then((response) => response.json())
            .then((shops) => {
                console.log(shops)

                navigator.geolocation.getCurrentPosition((position) => {
                    const nearest = {distance: null, shop: null}
                    
                    for(const shop of shops) {
                        const a = { lat: position.coords.latitude, lng: position.coords.longitude }
                        const b = { lat: shop.gps_lat, lng: shop.gps_lng }
                        
                        const distance = haversine(a, b) // 714504.18 (in meters) 
                        if (nearest.distance == null){
                            nearest.distance = distance;
                            nearest.shop = shop;
                        }else{
                            if(nearest.distance > distance){
                                nearest.distance = distance;
                                nearest.shop = shop;
                            }
                        } console.log(distance)
                    }
                    setMyShop({
                        name: nearest.shop.name, 
                        city:nearest.shop.city,
                        distance: (nearest.distance/1000).toFixed(2)
                       
                    });
                  });
            });

    }, []);

    


    return (
        <div className="flex flex-col h-full text-center">
            <h1 className="text-2xl text-center">{myShop.name}</h1>
            <p className="flex-grow">{myShop.distance}Km</p>
            <p>{myShop.city}</p>

        </div>
    );
};

export default MyShop;
