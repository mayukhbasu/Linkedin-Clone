import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import './Header.css';
import HeaderOptions from './HeaderOptions';
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
import { auth } from './firebase';

const Header = () => {
    const dispatch = useDispatch();
    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    }
    return (
        <div className="header">
            
            <div className="header__left">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt=""/>
                <div className="header__search">
                    <SearchIcon/>
                    <input type="text"/>
                </div>
            </div>   
            <div className="header__right">
                <HeaderOptions Icon={HomeIcon} title="Home"/>
                <HeaderOptions Icon={SupervisorAccountIcon} title="My Network"/>
                <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOptions Icon={ChatIcon} title="Messaging" />
                <HeaderOptions Icon={NotificationsIcon} title="Notifications" />
                <HeaderOptions onClick={logoutOfApp}
                avatar="data:image/jpeg;base64,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"
                title="me"/>
                
            </div>
        </div>
    );
};

export default Header;