import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection.connections);

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            console.log(res?.data?.data);
            dispatch(addConnection(res?.data?.data));
        }catch(err){
            console.error(err.message);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;

    return (
        <div className="flex justify-center my-15">
        <ul className="list bg-base-300 rounded-box shadow-md w-7/12">
        
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide border-b-base-300">My Connections</li>
            {connections.length === 0 ? (
                <p className="text-center opacity-60 my-15">No Connections Found</p>
            ) :connections.map((connection) => <div key={connection.id || connection._id}>
                <li className="list-row">
                    <div><img className="size-10 rounded-box" src={connection.photoUrl}/></div>
                    <div>
                    <div>{connection.firstName} {connection.lastName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">{connection.about}</div>
                    </div>
                    <button className="btn btn-ghost border-base-200">
                    Message
                    </button>
                    <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">•••</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><a><MdDelete />Remove Connection</a></li>
                    </ul>
                    </div>
                </li> 
            </div>)}
        </ul>
        </div>
    )
}

export default Connections;