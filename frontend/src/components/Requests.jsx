import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReceivedRequests, addSentRequests } from "../utils/requestSlice";

const Requests = () => {

    const dispatch = useDispatch();
    const { received, sent } = useSelector((store) => store.requests);

    const fetchReceivedRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            console.log("Received requests:", res?.data?.data);
            dispatch(addReceivedRequests(res?.data?.data));
        }catch(err){
            console.error(err.message);
        }
    }

    const fetchSentRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/sent", {
                withCredentials: true,
            });
            console.log("Sent requests:", res?.data?.data);
            dispatch(addSentRequests(res?.data?.data));
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchReceivedRequests();
        fetchSentRequests();
    }, []);

    const receivedRequests = received || [];
    const sentRequests = sent || [];

    return (
        <div className="flex justify-center my-15">
        <ul className="list bg-base-300 rounded-box shadow-md w-7/12">
        
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">Manage Connection Requests</li>
        {/* name of each tab group should be unique */}
        <div className="tabs tabs-border">
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Received" defaultChecked  />
        <div className="tab-content border-base-300 bg-base-100 p-10">
            {receivedRequests.length === 0 ? (
                <p className="text-center opacity-60">No received requests</p>
            ) : (
                receivedRequests.map((request) => (
                    <div key={request.fromUserId?.id || request.fromUserId?._id || request._id}>
                        <li className="list-row">
                            <div><img className="size-10 rounded-box" src={request.fromUserId?.photoUrl} alt="profile"/></div>
                            <div>
                                <div>{request.fromUserId?.firstName} {request.fromUserId?.lastName}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{request.fromUserId?.about}</div>
                            </div>
                            <button className="btn btn-ghost">
                                Accept
                            </button>
                            <button className="btn btn-ghost">
                                Ignore
                            </button>
                        </li> 
                        <div className="divider"></div>               
                    </div>
                ))
            )}
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="Sent"/>
        <div className="tab-content border-base-300 bg-base-100 p-10">
            {sentRequests.length === 0 ? (
                <p className="text-center opacity-60">No sent requests</p>
            ) : (
                sentRequests.map((request) => (
                    <div key={request.toUserId?.id || request.toUserId?._id || request._id}>
                        <li className="list-row">
                            <div><img className="size-10 rounded-box" src={request.toUserId?.photoUrl} alt="profile"/></div>
                            <div>
                                <div>{request.toUserId?.firstName} {request.toUserId?.lastName}</div>
                                <div className="text-xs uppercase font-semibold opacity-60">{request.toUserId?.about}</div>
                            </div>
                            <button className="btn btn-ghost">
                                Pending
                            </button>
                        </li> 
                        <div className="divider"></div>               
                    </div>
                ))
            )}    
        </div>
        </div>

        </ul>
        </div>
    )
}

export default Requests;