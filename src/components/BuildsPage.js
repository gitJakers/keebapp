import React, { useContext, useEffect, useState } from 'react'
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import { GetAllBuilds } from '../Services/apiService.js';
import BuildCard from './BuildCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function BuildsPage() {

  useEffect(async () => {
    setData(await GetAllBuilds());
  }, [])

  const { currentUser } = useContext(UserContext);

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
          {/* <div id="buildFilterSidebar">
            <h3>Filter Settings</h3>
          </div> */}
          {/* Build Gallery */}
          <input type="text" placeholder="Search for builds by name" id="buildSearchBar" onChange={(e) => handleBuildSearch(e.target.value)} />
          <div id="buildsGallery">
            {/* Conditional Rendering of builds */}
            {
              buildData === null || buildData === undefined ?
                <div style={{margin: "auto"}}>
                  <FontAwesomeIcon style={{marginLeft:"8rem"}} className="fa-spin fa-4x" icon={faCog} />
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