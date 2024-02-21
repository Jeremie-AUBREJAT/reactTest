
import React, { useContext } from "react";
import BookmarksContext from "./BookmarksContext";
const Bookmarks = () => {
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);
    const deleteBookmarks = (index) => {
        const tmpBookmarks = [...bookmarks];
        tmpBookmarks.splice(index,1);
        setBookmarks(tmpBookmarks);
    }
   
       
return (
<>
<ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
{bookmarks.map((bookmark, index) => (
<li className="py-2 px-4 border-b border-gray-500" key={index}>
{bookmark.name}<button onClick={() => { deleteBookmarks(index) }}>🗑</button></li>

))}
</ul>

</>
)
}
export default Bookmarks;