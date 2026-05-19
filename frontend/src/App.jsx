import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appstore';
import EditProfile from './components/EditProfile';
import Connections from './components/Connections';
import Requests from './components/Requests';
import Learn from './components/Learn';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUs from './components/AboutUs';
import Support from './components/Support';
import Settings from './components/Settings';

function App() {
    return (
        <>
          <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/learn" element={<Learn />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/support" element={<Support />} />
                        <Route 
                            path="/settings" 
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/profile/edit" 
                            element={
                                <ProtectedRoute>
                                    <EditProfile />
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
                    </Route>
                </Routes>
            </BrowserRouter>
          </Provider>
        </>
    );
}

export default App;
