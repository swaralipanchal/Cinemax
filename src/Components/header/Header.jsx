/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { SiThemoviedatabase } from "react-icons/si";
import { MdMovie } from "react-icons/md";
import { RiMovieFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
       window.scrollTo(0,0);
    },[location])

    const controlNavbar =() =>{
        if(window.scrollY > 200){
            if(window.scrollY > lastScrollY && !mobileMenu)
            {
                setShow("hide")
            }else{
                setShow("show")
            }   
        }else{
         setShow("top");
        }
        setLastScrollY(window.scrollY);
     
    }

    useEffect(()=>{
       window.addEventListener("scroll",controlNavbar)
       return () =>{
        window.removeEventListener("scroll",controlNavbar)
       }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lastScrollY])

    const openSearch = () =>{
        setMobileMenu(false)
        setShowSearch(true)
    }
   
    const openMobileMenu = () =>{
        setMobileMenu(true)
        setShowSearch(false)
    }
    const closeMobileMenu = () =>{
        setMobileMenu(false)
    }

    const navigationHandler = (type) =>{
        if(type === "movie"){
          navigate("/explore/movie")
        }else {
            navigate("/explore/tv")
        }
        setMobileMenu(false)
    }
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
          navigate(`/search/${query}`)
          setTimeout(()=>{
             setShowSearch(false)
          },1000);
        }
      }
    return (
       <header className={`header ${mobileMenu ? "mobileView" 
    : ""} ${show}`}>
        <ContentWrapper>
            <div className="logo" onClick={()=> navigate("/")}>
                {/* <MdMovie className="play" /> */}
                <h2 className="img"><span>C</span>inemax</h2>
               
            </div>
            <ul className="menuItems">
                    <li
                        className="menuItem"
                       onClick={()=> navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={()=> navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems" style={{color:"white"}}>
                    <HiOutlineSearch  onClick={openSearch}/>
                    {
                        mobileMenu ? ( <VscChromeClose onClick={closeMobileMenu}/>) : (<SlMenu onClick={openMobileMenu}/>)
                       
                    }
                  
                </div>
        </ContentWrapper>

    {
        showSearch && (
            <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
            <input
              type="texttext"
              placeholder='Search for a movie or a tv show....'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={()=> setShowSearch(false)}/>
          </div>
            </ContentWrapper>
        </div>
        )
    }
       </header>
    );
};

export default Header