import { useEffect, useState } from "react";
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom";
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";


function Sidebar({ handleDisplayUserDetails, handleDisplayChat }) {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({ name: '', profilePic: '' });


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        const userRef = doc(db, 'users', user.uid);
                        const userSnapshot = await getDoc(userRef);

                        if (userSnapshot.exists()) {
                            const userData = userSnapshot.data();
                            const { displayName, profilepic } = userData;
                            setUserDetails({ name: displayName, profilepic });
                        } else {
                            console.log('No such document!');
                        }
                    } else {
                        console.log('No user signed in');
                    }
                });
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };
        fetchUserData();
    }, []);
    const handleSignOut = async () => {
        await auth.signOut()
        navigate('/')
    }



    return (
        <Card className=" bg-slate-200 text-gray-800 lg:block h-[calc(97vh-2rem)] w-[20%] max-w-[18rem] p-2 shadow-xl rounded-none  ">

            <List>
                <ListItem onClick={handleDisplayUserDetails} className="cursor-pointer flex items-center space-x-2 p-3 my-4 hover:bg-cyan-600 hover:text-white">
                    <img
                        src={userDetails.profilepic || 'default-profile-pic-url'}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm font-medium">{userDetails.name}</span>
                </ListItem>

                <Link to='/home'>
                    <ListItem className="hover:bg-cyan-600 hover:text-white">
                        <ListItemPrefix className="h-5 w-5 mr-3">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" />
                            </svg>

                        </ListItemPrefix>
                        Home
                    </ListItem>
                </Link>
                <ListItem className="hover:bg-cyan-600 hover:text-white">
                    <ListItemPrefix className="h-5 w-5 mr-3">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                        </svg>

                    </ListItemPrefix>
                    Groups
                </ListItem>
                <Link to='/inbox'>
                    <ListItem className="hover:bg-cyan-600 hover:text-white">
                        <ListItemPrefix className="h-5 w-5 mr-3">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z" clipRule="evenodd" />
                            </svg>

                        </ListItemPrefix>
                        Inbox

                    </ListItem>
                </Link>
                <ListItem className="hover:bg-cyan-600 hover:text-white">
                    <ListItemPrefix className="h-5 w-5 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                        </svg>


                    </ListItemPrefix>
                    Events
                </ListItem>
                <Link to='/profile'>
                    <ListItem className="hover:bg-cyan-600 hover:text-white">
                        <ListItemPrefix className="h-5 w-5 mr-3">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                            </svg>

                        </ListItemPrefix>
                        Profile
                    </ListItem>
                </Link>

                <ListItem className="hover:bg-cyan-600 hover:text-white" onClick={handleSignOut}>
                    <ListItemPrefix className="h-5 w-5 mr-3">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>

                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}
export default Sidebar