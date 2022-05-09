import React, { useContext } from 'react'
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import MechKeyboardLogo from '../assets/MechKeyboardLogo.PNG';
import KBDLogo from '../assets/KBDLogo.png';
import Footer from './Footer.js';
import SubredditIcon from '../assets/SubredditIcon.png';
import DropLogo from '../assets/DropLogo.PNG';
import '../styles/ResourceStyles.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function ResourcePage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {/* Banner */}
      <Banner title="Useful Resources" />
      <div id="resourcePage">
        {/* Resource Intro */}
        <div id="resourcesHeader">
          <h2 id="resourceTitle">
            New to the mechanical keyboard scene?
            <br />
            Here are some helpful links to get started.
          </h2>
        </div>
        <hr />
        {/* Resource Links */}
        <div className="resourceLinkBox">
          <div className="resourceBlock">
            
            <div className="resourceImg">
              <img src={MechKeyboardLogo} alt="Mechanical Keyboards Logo" title="MechanicalKeyboards.com" />
            </div>
            <div>
              <h3>Mechanical Keyboards</h3>
              <p>
                Mechanicalkeyboards.com is a useful site for checking prices of various
                <br />
                keyboard parts, prebuilts, and even other custom builds! They also have guides
                <br />
                to help you learn some of the basics of mechanical keyboards.
                <br />
                A great place to start for the new and veteran alike!
              </p>
              <a href="https://mechanicalkeyboards.com/index.php">
                <p>Check them out here!</p>
              </a>
            </div>
          </div>
        </div>

        <div className="resourceLinkBox">
          <div className="resourceBlock">
            <div id="kbdLogoBox">
              <div id="kbdLogo">
                <img src={KBDLogo} alt="KBDFans Logo" title="KBDFans Logo" />
              </div>
            </div>
            <div>
              <h3>KBDFans</h3>
              <p>
                KBDFans.com is storefront for mechanical keyboard parts.
                <br />
                They have more specialized parts and even track popular Group Buys.
                <br />
                If you're looking for a more enthusiast focused site,
                <br />
                this is the place for you.
              </p>
              <a href="https://kbdfans.com/">
                <p>Check them out here!</p>
              </a>
            </div>
          </div>
        </div>

        <div className="resourceLinkBox">
          <div className="resourceBlock">
            <div className="resourceImg">
              <img src={DropLogo} alt="Logo for Drop.com" title="Drop Logo" />
            </div>
            <div>
              <h3>Drop</h3>
              <p>
                Drop.com is another storefront for purchasing a variety of
                <br />
                things, they have an entire section dedicated to keyboards.
                <br />
                They offer many unique keyboard items such as their own brand
                <br />
                of custom prebuilt keyboards. Definitely worth checking out!
              </p>
              <a href="https://drop.com/mechanical-keyboards/home">
                <p>Check them out here!</p>
              </a>
            </div>
          </div>
        </div>
        <div className="resourceLinkBox">
          <div className="resourceBlock">
            <div className="resourceImg">
              <img id="subredditImg" src={SubredditIcon} alt="Subreddit Icon" title="Mechanical Keyboards Subreddit" />
            </div>
            <div>
              <h3>MechanicalKeyboards Subreddit</h3>
              <p>
                Reddit.com/r/MechanicalKeyboards is really good place
                <br />
                to see what the mechanical keyboard community is up to.
                <br />
                A great place to find inspiration and as well as seeing
                <br />
                some of the more trendy builds out there.
              </p>
              <a href="https://www.reddit.com/r/MechanicalKeyboards/">
                <p>Check them out here!</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer user={currentUser} />
    </div>
  )
}