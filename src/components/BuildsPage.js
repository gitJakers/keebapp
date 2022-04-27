import React, { useContext, useEffect, useState } from 'react';
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import { GetAllBuilds } from '../Services/apiService.js';
import BuildCard from './BuildCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import '../styles/BuildStyles.css';

export default function BuildsPage() {

  
  const { currentUser, allBuildData, setBuildDb} = useContext(UserContext);
  
  useEffect(async () => {
    
    setData(await GetAllBuilds());
  
  }, [])

  const [buildData, setData] = useState();

  const [buildSearch, setSearch] = useState("");

  const [filteredBuilds, setFBuilds] = useState();

  const handleBuildSearch = (searchValue) => {
    setSearch(searchValue);
    setFBuilds(buildData.filter(build => {
      return build.name.toLowerCase().includes(searchValue.toLowerCase());
    }))
  }

  return (
    <>
      <div>
        {/* Banner */}
        <Banner title="Keyboard Builds" />
        {/* Filter Section */}
        <div id="buildsBox">
          {/* Build Gallery */}
          <input type="text" placeholder="Search for builds by name" id="buildSearchBar" onChange={(e) => handleBuildSearch(e.target.value)} />
          <div id="buildsGallery">
            {/* Conditional Rendering of builds */}
            {
              buildData === null || buildData === undefined ?
                <div style={{margin: "auto"}}>
                  <FontAwesomeIcon style={{marginLeft:"8rem"}} className="fa-spin fa-4x" icon={faGear} />
                  <p style={{fontWeight:"bold", fontSize:"1.4rem"}}>Builds are loading please wait...</p>
                </div>
                // Add loading spinner here
                :
                filteredBuilds === undefined || buildSearch.length === 0 ?
                  buildData.map((build, index) => {
                    return (
                      <BuildCard buildInfo={build} key={index} />
                    )
                  })
                  :
                  filteredBuilds.map((build, index) => {
                    return (
                      <BuildCard buildInfo={build} key={index} />
                    )
                  })
            }
          </div>
        </div>
      </div>
    </>
  )
}