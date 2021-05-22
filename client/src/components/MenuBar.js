import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (_, { name }) => setActiveItem(name);

  const userName = user && (
    <Menu.Item name={user.username} active as={Link} to="/" />
  );
  const logoutBtn = <Menu.Item name="Logout" onClick={logout} />;

  return (
    <Menu pointing secondary size="large" color="teal">
      {user ? (
        userName
      ) : (
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
      )}
      <Menu.Menu position="right">
        {user ? (
          logoutBtn
        ) : (
          <>
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
