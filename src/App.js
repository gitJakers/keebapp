import './App.css';
import { useState, useContext, useMemo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import HistoryPage from './components/HistoryPage.js';
import ResourcePage from './components/ResourcePage.js';
import BuildPage from './components/BuildsPage.js';
import ProfilePage from './components/ProfilePage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';
import UserContext from './context/UserContext.js';
import { GetUserById, GetSavedBuilds, GetSavedBuildsById, GetSavedBuildsByUserId, GetAllBuilds } from './Services/apiService.js';

function App() {

  const [currentUser, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadedFromStorage, setLoad] = useState();
  const [savedBuildsData, setSavedData] = useState();
  const [allBuildData, setBuildDb] = useState(GetAllBuilds);
  const providerValue = useMemo(() => ({currentUser, setUser, isLoggedIn, setIsLoggedIn, loadedFromStorage, setLoad, savedBuildsData, setSavedData, allBuildData, setBuildDb }), [currentUser, setUser], [isLoggedIn, setIsLoggedIn], [loadedFromStorage, setLoad], [savedBuildsData, setSavedData], [allBuildData, setBuildDb]);

  useEffect(async() => {
    if(localStorage.getItem('UserId') != null){
      let user = await GetUserById(localStorage.getItem('UserId'));
      const savedArr = await GetSavedBuildsByUserId(user.id);
      await GetSavedBuildsById(savedArr);
      setSavedData(GetSavedBuilds());
      setUser(user);
      setLoad(true);
    }
  }, [])

  return (
    <div className="siteBG">
      <UserContext.Provider value={providerValue}>
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/History" element={<HistoryPage />} />
            <Route path="/Builds" element={<BuildPage />} />
            <Route path="/Resources" element={<ResourcePage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
