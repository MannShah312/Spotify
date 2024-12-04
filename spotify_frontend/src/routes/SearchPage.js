// // import { useState } from "react";
// // import LoggedInContainer from "../Containers/LoggedInContainer";
// // import {Icon, icon} from "@iconify/react";

// // const SearchPage = () => {
// //     const [isInputFocused, setIsInputFocused] = useState(false);
// //     return(
// //     // <div>Jai Shree Krishna</div>
// //     <LoggedInContainer curActiveScreen="search">
// //         <div className="w-full py-6">
// //             <div className={`w-2/5 p-3 text-sm rounded-full bg-gray-800 text-white px-5 flex space-x-3 items-center 
// //                 ${isInputFocused ? "border border-white" : ""}
// //             `}>
// //                 <Icon icon="ic:outline-search" className="text-white text-lg " />
// //                 <input 
// //                     type="text" 
// //                     placeholder="What do you want to listen?"
// //                     className="w-full bg-gray-800"
// //                     onFocus={()={setIsInputFocused(true);
// //                     }}
// //                     onBlur={() => {
// //                         setIsInputFocused(false);
// //                     }}
// //                 />
// //             </div>
// //         </div>
// //     </LoggedInContainer>
// //     )
// // };
// // export default SearchPage;

// import { useState, useEffect } from "react";
// import LoggedInContainer from "../Containers/LoggedInContainer";
// import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
// import { Icon } from "@iconify/react";

// const SearchPage = async() => {
//     const [isInputFocused, setIsInputFocused] = useState(false);
//     const [searchText, setSearchText] = useState("");

//     // useEffect(() => {
//     //     if (searchText) {
//     //         searchSong();
//     //     }
//     // }, [searchText]);

//     const searchSong = async () => {
//         // This function will call tbe search api
//         const response = await makeAuthenticatedGETRequest("/song/get/songname/" + searchText);
//         console.log(response);
//         setSearchText("");
//     };

//     return (
//         <LoggedInContainer curActiveScreen="search">
//             <div className="w-full py-6">
//                 <div className={`w-2/5 p-3 text-sm rounded-full bg-gray-800 text-white px-5 flex space-x-3 items-center 
//                     ${isInputFocused ? "border border-white" : ""}
//                 `}>
//                     <Icon icon="ic:outline-search" className="text-white text-lg" />
//                     <input 
//                         type="text" 
//                         placeholder="What do you want to listen?"
//                         className="w-full bg-gray-800 focus:outline-none"
//                         onFocus={() => setIsInputFocused(true)}
//                         onBlur={() => setIsInputFocused(false)}
//                         value={searchText}
//                         onChange={(e) => {setSearchText(e.target.value);
//                         }}
//                         onKeyDown={(e) => {
//                             console.log(e);
//                         }}
//                     />
//                 </div>
//             </div>
//         </LoggedInContainer>
//     );
// };

// export default SearchPage;
import {useState} from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

import {Icon} from "@iconify/react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);

    const searchSong = async () => {
        // This function will call the search api
        const response = await makeAuthenticatedGETRequest(
            "/song/get/songname/" + searchText
        );
        setSongData(response.data);
    };

    return (
        <LoggedInContainer curActiveScreen="search">
            <div className="w-full py-6">
                <div
                    className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${
                        isInputFocused ? "border border-white" : ""
                    }`}
                >
                    <Icon icon="ic:outline-search" className="text-lg" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-gray-800 focus:outline-none"
                        onFocus={() => {
                            setIsInputFocused(true);
                        }}
                        onBlur={() => {
                            setIsInputFocused(false);
                        }}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchSong();
                            }
                        }}
                    />
                </div>
                {songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-400 pt-10">
                        Nothing to show here.
                    </div>
                )}
            </div>
        </LoggedInContainer>
    );
};
export default SearchPage;