import React from "react";
//import "./Navbar.css"; // Optional: For custom styling

const Navbar = () => {
  return (
    <div className="w-full grid md:grid-cols-3 items-center px-12 py-4">
      <div data-column="start" data-placements="1" >
        <div data-items="primary">
          <div
            className="site-branding"
            data-id="logo"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <a
              href="https://tsogainsure.com/"
              className="site-logo-container"
              rel="home"
              itemProp="url"
            >
              <img
                loading="lazy"
                className=""
                src="https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo.png"
                
                alt="Tsoga Insure"
                decoding="async"
                srcSet="https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo.png 2412w, https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo-300x80.png 300w, https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo-1024x273.png 1024w, https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo-768x204.png 768w, https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo-1536x409.png 1536w, https://tsogainsure.com/wp-content/uploads/2025/03/Tsoga-Afrika-Logo-Original_logo-2048x545.png 2048w"
                sizes="(max-width: 2412px) 100vw, 2412px"
              />
            </a>
          </div>
        </div>
      </div>

      <div data-column="middle" c>
        <div data-items="" className="hidden md:block">
          <nav
            id="header-menu-1"
            className="header-menu-1 menu-container "
            data-id="menu"
            data-interaction="hover"
            data-menu="type-3"
            data-dropdown="type-1:simple"
            data-responsive="yes"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
            aria-label="Main Menu"
          >
            <ul id="menu-main-menu" className="menu flex justify-center gap-2 ">
              <li className="menu-item">
                <a href="https://tsogainsure.com/" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md ct-menu-link">
                  Home
                </a>
              </li>
              <li className="menu-item current-menu-item">
                <a
                  href="https://tsogainsure.com/services/"
                  aria-current="page"
                  className="ct-menu-link px-4 py-2 bg-slate-100 rounded-md hover:bg-slate-200"
                >
                  Services
                </a>
              </li>
              {/* <li
                className="menu-item menu-item-has-children more-items-container animated-submenu-block"
                data-submenu="right"
              >
                <a href="#" className="ct-menu-link">
                  More
                  <span className="ct-toggle-dropdown-desktop">
                    <svg
                      className="ct-icon"
                      width="8"
                      height="8"
                      viewBox="0 0 15 15"
                    >
                      <path d="M2.1,3.2l5.4,5.4l5.4-5.4L15,4.3l-7.5,7.5L0,4.3L2.1,3.2z" />
                    </svg>
                  </span>
                </a>
                <button
                  className="ct-toggle-dropdown-desktop-ghost"
                  aria-expanded="false"
                  aria-label="Expand dropdown menu"
                ></button>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a
                      href="https://allbroker-tsoga-kasisure.vercel.app/"
                      className="ct-menu-link"
                    >
                      Kasi Sure
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://tsogainsure.com/about/"
                      className="ct-menu-link"
                    >
                      About
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://tsogainsure.com/news/"
                      className="ct-menu-link"
                    >
                      News
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://tsogainsure.com/contact/"
                      className="ct-menu-link"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>

      <div data-column="end" data-placements="1">
        <div data-items="primary" className="hidden md:block">
          <div className="ct-header-socials" data-id="socials">
            <div
              className="ct-social-box flex justify-end gap-4"
              data-color="custom"
              data-icon-size="custom"
              data-icons-type="rounded:solid"
            >
              <a href="#" data-network="facebook" aria-label="Facebook" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200" >
                <span className="ct-icon-container ">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M20,10.1c0-5.5-4.5-10-10-10S0,4.5,0,10.1c0,5,3.7,9.1,8.4,9.9v-7H5.9v-2.9h2.5V7.9C8.4,5.4,9.9,4,12.2,4c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L13.9,13h-2.3v7C16.3,19.2,20,15.1,20,10.1z" />
                  </svg>
                </span>
              </a>
              <a href="#" data-network="twitter" aria-label="X (Twitter)" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                <span className="ct-icon-container">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M2.9 0C1.3 0 0 1.3 0 2.9v14.3C0 18.7 1.3 20 2.9 20h14.3c1.6 0 2.9-1.3 2.9-2.9V2.9C20 1.3 18.7 0 17.1 0H2.9zm13.2 3.8L11.5 9l5.5 7.2h-4.3l-3.3-4.4-3.8 4.4H3.4l5-5.7-5.3-6.7h4.4l3 4 3.5-4h2.1zM14.4 15 6.8 5H5.6l7.7 10h1.1z" />
                  </svg>
                </span>
              </a>
              <a href="#" data-network="instagram" aria-label="Instagram" className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                <span className="ct-icon-container">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="3.3" />
                    <path d="M14.2,0H5.8C2.6,0,0,2.6,0,5.8v8.3C0,17.4,2.6,20,5.8,20h8.3c3.2,0,5.8-2.6,5.8-5.8V5.8C20,2.6,17.4,0,14.2,0zM10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M15.8,5C15.4,5,15,4.6,15,4.2s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S16.3,5,15.8,5z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
