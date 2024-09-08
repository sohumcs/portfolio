import { faGithub } from '@fortawesome/free-brands-svg-icons'; // LinkedIn, GitHub
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import './App.css'; // Ensure your CSS is updated for this layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faBook, faArrowLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [currentView, setCurrentView] = useState('fullscreen'); // State to manage fullscreen prompt
  const [selectedProject, setSelectedProject] = useState(null); // State to manage the selected project
  const [typingText, setTypingText] = useState(''); // For typing animation in the About window
  const [typingFinished, setTypingFinished] = useState(false); // Track if typing is finished

  const openAbout = () => {
    setShowAbout(true);
    setTypingText(''); // Reset typing text
    setTypingFinished(false); // Reset typing finished state
  };
  const closeAbout = () => setShowAbout(false);

  const openProjects = () => {
    setShowProjects(true);
    setCurrentView('main'); // Reset to main view when opening projects
  };
  const closeProjects = () => setShowProjects(false);

  const openConnect = () => setShowConnect(true);
  const closeConnect = () => setShowConnect(false);

  const handleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
    setCurrentView('main'); // After fullscreen, show the main content
  };

  // Data for the projects
  const projects = [
    {
      name: 'QR Code Scanner',
      repoLink: 'https://github.com/sohumcs/qr-code-generator',
      description: 'A tool to generate QR codes using HTML, CSS, and JS.',
    },
    {
      name: 'Portfolio',
      repoLink: 'https://github.com/sohumcs/portfolio',
      description: 'Personal portfolio showcasing projects and skills.',
    },
    {
      name: 'Weather App',
      repoLink: 'https://github.com/sohumcs/weather-app',
      description: 'A weather application built with React and OpenWeather API.',
    },
    {
      name: 'Markdown Previewer',
      repoLink: 'https://github.com/sohumcs/markdown-previewer',
      description: 'A tool to preview Markdown syntax using React.',
    },
    {
      name: 'Cricket Comparison Tool',
      repoLink: 'https://github.com/sohumcs/cricket-comparison-tool',
      description: 'Compare cricket stats using React and a cricket API.',
    },
    {
      name: 'Python SQL',
      repoLink: 'https://github.com/sohumcs/python-sql',
      description: 'A Python project demonstrating SQL database integration.',
    },
    {
      name: 'Quote Generator',
      repoLink: 'https://github.com/sohumcs/quote-generator',
      description: 'A random quote generator using HTML, CSS, and JavaScript.',
    },
    {
      name: 'Drum Machine',
      repoLink: 'https://github.com/sohumcs/drum-machine',
      description: 'A drum machine application built with React.',
    },
    {
      name: '25+5 Clock',
      repoLink: 'https://github.com/sohumcs/25-clock',
      description: 'A Pomodoro clock application built with React.',
    },
  ];


  // Function to handle opening a folder (project)
  const openFolder = (project) => {
    setSelectedProject(project);
    setCurrentView('project'); // Switch to project view
  };

  // Function to go back to the main view
  const goBackToMainView = () => {
    setSelectedProject(null);
    setCurrentView('main');
  };

  // Typing animation effect for "whoami" command in the About window
  useEffect(() => {
    if (showAbout) {
      const text = '> whoami';
      let index = 0;
      const interval = setInterval(() => {
        setTypingText((prev) => prev + text[index]);
        index++;
        if (index === text.length) {
          setTypingFinished(true); // Mark typing as finished
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showAbout]);

  return (
    <div className="app">
      {currentView === 'fullscreen' ? (
        <div className="fullscreen-prompt">
          <h1>Welcome to my Portfolio</h1>
          <p>Please enter fullscreen to view the content.</p>
          <button onClick={handleFullscreen}>Go Fullscreen</button>
        </div>
      ) : (
        <>
          <Sidebar openAbout={openAbout} openProjects={openProjects} openConnect={openConnect} />
          <Taskbar openAbout={openAbout} openProjects={openProjects} openConnect={openConnect} />

          {showAbout && (
            <div className="window about-window">
              <div className="window-header">
                Command Prompt
                <button onClick={closeAbout}>X</button>
              </div>
              <div className="window-body">
                <p className="typing-text">{typingText}</p>
                {typingFinished && <p>sohumcs | Full Stack Developer | BTech-CSE</p>}
              </div>
            </div>
          )}

          {showProjects && (
            <div className="window projects-window">
              <div className="window-header">
                File Explorer
                <button onClick={closeProjects}>X</button>
              </div>
              <div className="window-body">
                {/* Main View: List of project folders */}
                {currentView === 'main' && (
                  <div className="folder-list">
                    {projects.map((project) => (
                      <div key={project.name} className="project-folder" onClick={() => openFolder(project)}>
                        <FontAwesomeIcon icon={faFolder} className="icon folder-icon" />
                        <span>{project.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Project View: Specific project content */}
                {currentView === 'project' && selectedProject && (
                  <div className="project-view">
                    <button className="back-button" onClick={goBackToMainView}>
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <div className="file">
                      {selectedProject.name === 'Resume' ? (
                        <>
                          <FontAwesomeIcon icon={faFilePdf} className="file-icon" />
                          <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faGithub} className="file-icon" />
                          <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer">
                            GitHub Repo
                          </a>
                        </>
                      )}
                    </div>
                    <div className="file">
                      <FontAwesomeIcon icon={faBook} className="file-icon" />
                      <span>Description</span>
                      <div className="notepad-window">
                        <p>{selectedProject.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {showConnect && (
            <div className="window connect-window">
              <div className="window-header">
                Notepad
                <button onClick={closeConnect}>X</button>
              </div>
                <div className="window-body">
                  <h3>Connect with me for exciting collaborations and exciting discussions</h3>
                <p>Email: sohum611@gmail.com</p>
                <p>Phone: +91 9560978340</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
