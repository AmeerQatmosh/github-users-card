import React, { useState, useEffect } from "react";
import "./App.css";
import ReactDOM from "react-dom/client";

import githubLogo from "./github-logo.png";

const withFetchData = (WrappedComponent, url) => {
  return () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }, []);

    return <WrappedComponent data={data} />;
  };
};

const UserList = ({ data }) => (
  <div className="card-container">
    {data &&
      data.map((item) => {
        return (
          <div className="card" key={item.id}>
            <img
              className="avatar"
              src={item.avatar_url}
              alt={`Avatar for ${item.login}`}
            />
            <p className="login">{item.login}</p>
            <a
              className="profile-link"
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
        );
      })}
  </div>
);

const UserListWithFetch = withFetchData(UserList, "https://api.github.com/users");

const App = () => (
  <>
    <header className="header">
      <img className="header-logo" src={githubLogo} alt="GitHub Logo" />
      <h1 className="header-title">GitHub Users</h1>
    </header>
    <UserListWithFetch />
    <footer className="footer">
      <p className="footer-text">© 2023 GitHubUsers Website. All rights reserved.</p>
    </footer>
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
