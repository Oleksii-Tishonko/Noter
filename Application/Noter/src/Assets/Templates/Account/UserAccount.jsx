import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import './UserAccountStyles.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../Authentificate/AuthContext';
import cache from '../../../Сache/cache';

const UserAccount = () => {
    const [subPage, setSubPage] = React.useState(<></>);
    const [userData, setUserData] = useState(null);
    const { user } = useContext(AuthContext);

    const pageComponent = (pageName) => {
        switch(pageName){
            case 'main':
                return <Main/>
            case 'theme':
                return <Theme/>
            case 'data':
                return <Data userdata={userData} />;
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
                <Link to='/userAccount?page=main' className="subpage">main</Link>
                <Link to='/userAccount?page=theme' className="subpage">theme</Link>
                <Link to='/userAccount?page=data' className="subpage">data</Link>
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

const Theme = () => {
    return (
       <div className="theme">
          <div>This is the theme page content. There you can change the theme of the website</div>
       </div>
    );
}

const Data = ({userdata}) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log('data changed');
        setUserData(userdata);
    }, [userdata]);

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
          </div>}
       </>
    );

    
}

