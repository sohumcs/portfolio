// src/components/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faFolder, faStickyNote, faBook } from '@fortawesome/free-solid-svg-icons'; // Add book icon for resume
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // LinkedIn, GitHub
import './Sidebar.css';

const Sidebar = ({ openAbout, openProjects, openConnect }) => {
  return (
    <div className="sidebar">
      <div className="icon-container" onClick={openAbout}>
        <FontAwesomeIcon icon={faTerminal} className="icon" />
        <span className="icon-text">About</span>
      </div>
      <div className="icon-container" onClick={openProjects}>
        <FontAwesomeIcon icon={faFolder} className="icon" />
        <span className="icon-text">Projects</span>
      </div>
      <div className="icon-container" onClick={openConnect}>
        <FontAwesomeIcon icon={faStickyNote} className="icon" />
        <span className="icon-text">Connect</span>
      </div>
      <div className="icon-container" onClick={() => window.open('https://github.com/sohumcs', '_blank')}>
        <FontAwesomeIcon icon={faGithub} className="icon" />
        <span className="icon-text">GitHub</span>
      </div>
      <div className="icon-container" onClick={() => window.open('https://www.linkedin.com/in/sohumcs/', '_blank')}>
        <FontAwesomeIcon icon={faLinkedin} className="icon" />
        <span className="icon-text">LinkedIn</span>
      </div>
      <div className="icon-container" onClick={() => {
  const link = document.createElement('a');
  link.href = '/resume-sohum.pdf';  // Ensure this is the correct path
  link.download = 'resume-sohum.pdf';  // This will trigger the download with the specified filename
  link.click();
}}>
  <FontAwesomeIcon icon={faBook} className="icon" />
  <span className="icon-text">Resume</span>
</div>
    </div>
  );
};

export default Sidebar;
