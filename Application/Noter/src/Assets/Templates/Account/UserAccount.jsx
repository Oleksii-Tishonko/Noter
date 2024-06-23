import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import './UserAccountStyles.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../Authentificate/AuthContext';
import cache from '../../../Сache/cache';
import Payments from './Payments/Payments';

const UserAccount = () => {
    const [subPage, setSubPage] = React.useState(<></>);
    const [userData, setUserData] = useState(null);
    const { user, logout } = useContext(AuthContext);

    const pageComponent = (pageName) => {
        switch(pageName){
            case 'main':
                return <Main />
            case 'settings':
                return <Settings />
            case 'payments':
                return <Payments userdata={userData} />
            case 'messages':
                return <Messages />
            case 'customerservice':
                return <CustomerService />
            case 'data':
                return <Data userdata={userData} logout={logout} />;
            default:
                return <Main/>
        }
    }
    
    useLayoutEffect(() => {
       LoadData();
    }, [user]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");

    useEffect(() => {
       setSubPage(pageComponent(page));
    }, [page, userData]);
    return (
       <div className="userAccountPage">
          <h1>User Account</h1>
          <div className="selectorWindow">
             <div className="subPageList">
                <Link to='?page=main' className="subpage">Orders & Returns</Link>
                <Link to='?page=settings' className="subpage">Settings</Link>
                <Link to='?page=payments' className="subpage">Payments</Link>
                <Link to='?page=messages' className="subpage">Messages</Link>
                <Link to='?page=customerservice' className="subpage">Customer service</Link>
                <Link to='?page=data' className="subpage">Data</Link>
             </div>
             <div className="content">{subPage}</div>
          </div>
       </div>
    );

    function LoadData() {
       if (!user || !user.uid) {
          console.error("User not logged in");
          return;
       }

       const uid = user.uid;

       const loader = cache.LoadingManager.UserAccount;
       loader.uid = uid;
       loader.Load(OnDataLoaded);
    }

    function OnDataLoaded(data) {
        console.log('got data');
        console.log(data);
       setUserData(data);
    }
}
 
export default UserAccount;


const Main = () => {
    return (
       <div className="main">
          <div>This is the main page content. There you can find your orders, returns, your membership, your gift cards and your messages</div>
       </div>
    );
}

const Settings = () => {
    return (
       <div className="settings">
          <div>This is the settings page content. There you can change your password, email, phone number and other personal information</div>
       </div>
    );
}



const Messages = () => {
    return (
       <div className="messages">
          <div>This is the messages page content. There you can find all your messages from the customer service</div>
       </div>
    );
}

const CustomerService = () => {
    return (
       <div className="customerService">
          <div>This is the customer service page content. There you can find all your messages to the customer service</div>
       </div>
    );
}

const Data = ({userdata, logout}) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log('data changed');
        setUserData(userdata);
    }, [userdata]);

    async function handleLogout() {
      await logout();
      cache.UserName = null;
    }

    return (
       <>
       {!userData && <div>Loading...</div>}
          {userData && <div className="data">
             <table>
                <tr>
                   <td>First Name</td>
                   <td>{userData.firstName}</td>
                </tr>
                <tr>
                   <td>Last Name</td>
                   <td>{userData.lastName}</td>
                </tr>
                <tr>
                   <td>id</td>
                   <td>{userData._id}</td>
                </tr>
                <tr>
                   <td>Email</td>
                   <td>{userData.email}</td>
                </tr>
             </table>
             <div className='logoutButton' onClick={() => handleLogout()}>Logout</div>
          </div>}
       </>
    );

    
}


