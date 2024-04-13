import React, { useState } from "react";

export default function SymptomsInput() {
  const [iconClick, setClick] = useState(false);
  function handleClick() {
    setClick((prev) => {
      return !prev;
    });
  }
  return (
    <form className={iconClick ? "show-search" : "text-box"}>
      <input
        className="search-input"
        name="content"
        placeholder="Type your symptoms..."
        rows="3"
      />
      <div className="search-icons" onClick={handleClick}>
        <i class="fa-solid fa-magnifying-glass" className="search"></i>
        <i class="fa-solid fa-x" className="close"></i>
      </div>
    </form>
  );
}
