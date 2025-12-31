import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appstore';
import EditProfile from './components/EditProfile';
import Connections from './components/Connections';
import Requests from './components/Requests';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <>
          <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/login" element={<Login />} />
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/feed" 
                            element={
                                <ProtectedRoute>
                                    <Feed/>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/connections" 
                            element={
                                <ProtectedRoute>
                                    <Connections/>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/requests" 
                            element={
                                <ProtectedRoute>
                                    <Requests/>
                                </ProtectedRoute>
                            } 
                        />
                        {/* <Route path="/profile/edit" element={<EditProfile />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
          </Provider>
        </>
    );
}

export default App;
