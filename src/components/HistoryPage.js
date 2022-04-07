import React, { useContext } from 'react'
import Banner from './Banner.js';
import UserContext from '../context/UserContext.js';
import Footer from './Footer.js';
import Sholes from '../assets/Sholes.jpg';
import QWERTY from '../assets/QWERTY.png';
import AZERTY from '../assets/AZERTY.png';
import Colemak from '../assets/Colemak.png';
import Dvorak from '../assets/Dvorak.png';
import '../styles/HistoryStyles.css';

export default function HistoryPage() {
    const { currentUser } = useContext(UserContext);
    return (
        <div>
            {/* Banner */}
            <Banner title="Keyboard Lore" />
            {/* Article Section */}
            <div id="historyPage">
                <div id="historyTitle">
                    <h1>A Brief History Of Layouts</h1>
                </div>
                <div id="historyArticleSection">
                    <div id='historyImgBox'>
                        <img id="SholesImg" src={Sholes} alt="Christopher Latham Sholes" title="Christopher Latham Sholes" />
                    </div>
                    <div id="beginningArticle">
                        <h3 className="articleTitle">Humble Beginnings</h3>
                        <p className="articleText">
                            Christopher Latham Sholes patented the
                            first modern typewriter in 1868. While this is not the only
                            instance of someone inventing a machine similar to the typewriter
                            at this time, it is one of the most influential.
                            <br />
                            One of the earliest
                            models Sholes worked on had a key layout of two rows of keys arranged
                            in an alphabetical order. In 1873 the manufacturing rights for this
                            typewriter was sold to E. Remmington and Sons.
                            <br />
                            Only 5 years later in
                            1878 the Remington No. 2 Typewriter would popularise the standard
                            QWERTY layout that we all know today.
                            <br />
                        </p>
                        <span>Christopher Latham Sholes pictured on left.</span>
                    </div>
                </div>
                <div id="modernArticleSection">
                    <h3 className="articleTitle">Modern Mechanical Layouts</h3>
                    <div id="modernArticle">
                        <p className="articleText">
                            Modern keyboards come in many different shapes, sizes, and layouts.
                            While not every keyboard utilizes the standard QWERTY layout it
                            certainly is the most prominent. Some other common key board layouts
                            include AZERTY, Colemak, and Dvorak. <br /> The AZERTY layout is
                            based on the QWERTY layout and primarily used in European countries
                            such as France and Belgium. In France the AZERTY layout is the normal
                            layout for keyboards, however in recent years the French Culture Ministry
                            has looked to replace the AZERTY layout with one that allows for a better
                            typing experience of French and other languages. <br /> The Colemak layout
                            is a more layout developed by Shai Coleman in 2006. This layout is natively
                            supported by most major operating systems, such as Mac OS, Linux, Android,
                            and Chrome OS. While not supported on the Windows OS there exists a program
                            to add support for Colemak layout. One major difference is the second backspace
                            button which occupies the spot where the Caps Locks button would have been.
                            <br /> Dvorak Layout was first patented in 1936 by August Dvorak and his 
                            brother-in-law, William Dealey. It was intended to be a more ergonomic option
                            compared to the standard QWERTY layout. This layout is supported by most 
                            modern operating systems including Windows and allow users to switch to this 
                            layout. <br /> 

                        </p>
                        <div className="layoutBox">
                            <div className="modernLayout">
                                <img src={QWERTY} className="layoutImg" alt="QWERTY Layout" title="QWERTY Layout" />
                                <span>QWERTY Layout</span>
                            </div>
                            <div className="modernLayout">
                                <img src={AZERTY} className="layoutImg" alt="" />
                                <span>AZERTY Layout</span>
                            </div>
                            <div className="modernLayout">
                                <img src={Colemak} className="layoutImg" alt="" />
                                <span>Colemak Layout</span>
                            </div>
                            <div className="modernLayout">
                                <img src={Dvorak} className="layoutImg" alt="" />
                                <span>Dvorak Layout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer user={currentUser} />
        </div>
    )
}