import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", {
            withCredentials: true,
            });

            const feedData = Array.isArray(res.data) ? res.data : res.data.data;

            dispatch(addFeed(feedData));
        } catch (err) {
            console.log("Error while fetching feed", err);
        }
    };
    
    useEffect(() => {
        getFeed();
    }, []);

    if (!Array.isArray(feed) || feed.length === 0) return null;

    return feed && (
        <div className="flex justify-center my-10"><UserCard user={feed[0]}/></div>
    )
}

export default Feed;