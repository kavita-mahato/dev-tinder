import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Body from "./Body";
import { Profile } from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;