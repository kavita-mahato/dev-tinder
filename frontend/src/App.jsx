import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appstore';
import EditProfile from './components/EditProfile';

function App() {
    return (
        <>
          <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/feed" element={<Feed/>} />
                        {/* <Route path="/profile/edit" element={<EditProfile/>} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
          </Provider>
        </>
    );
}

export default App;
