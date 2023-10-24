import React from "react";

const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header>
      <div className="darkmode-button" onClick={onToggleDarkMode}>
        <span className="icon" role="img">
          {darkMode ? "🌞" : "🌛"}
        </span>
      </div>
      {/* <h1>Todo List</h1> */}
    </header>
  );
};

export default Header;