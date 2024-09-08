// src/components/Taskbar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSquare, faFolder, faTerminal, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import './Taskbar.css';

const Taskbar = ({ openAbout, openProjects, openConnect }) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleStartMenuToggle = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleApplicationClick = (callback) => {
    callback();
    setIsStartMenuOpen(false); // Auto-close the start menu
  };

  return (
    <div className="taskbar">
      <div className="taskbar-icon" onClick={handleStartMenuToggle}>
        <FontAwesomeIcon icon={faSquare} />
      </div>
      <div className="taskbar-icon" onClick={openProjects}>
        <FontAwesomeIcon icon={faFolder} />
      </div>
      <div className="taskbar-icon" onClick={openAbout}>
        <FontAwesomeIcon icon={faTerminal} />
      </div>
      <div className="taskbar-icon" onClick={openConnect}>
        <FontAwesomeIcon icon={faStickyNote} />
      </div>

      {isStartMenuOpen && (
        <div className="start-menu">
          <button className="close-btn" onClick={handleStartMenuToggle}>X</button> {/* Close button */}
          <div className="start-menu-item" onClick={() => handleApplicationClick(openAbout)}>
            <FontAwesomeIcon icon={faTerminal} className="icon" />
            <span>About</span>
          </div>
          <div className="start-menu-item" onClick={() => handleApplicationClick(openProjects)}>
            <FontAwesomeIcon icon={faFolder} className="icon" />
            <span>Projects</span>
          </div>
          <div className="start-menu-item" onClick={() => handleApplicationClick(openConnect)}>
            <FontAwesomeIcon icon={faStickyNote} className="icon" />
            <span>Connect</span>
          </div>
          <div className="start-menu-item" onClick={() => window.open('https://github.com/sohumcs', '_blank')}>
            <FontAwesomeIcon icon={faGithub} className="icon" />
            <span>GitHub</span>
          </div>
          <div className="start-menu-item" onClick={() => window.open('https://linkedin.com', '_blank')}>
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
            <span>LinkedIn</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
