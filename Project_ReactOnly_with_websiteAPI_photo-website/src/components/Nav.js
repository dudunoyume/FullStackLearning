import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* ć anchor tag ćšćç¨ Lnik */}
          {/* <a href="/">Home</a> */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* <a href="/about">About</a> */}
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
