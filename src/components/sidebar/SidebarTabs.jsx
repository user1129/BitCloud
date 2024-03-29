/* eslint-disable no-unused-vars */
// Importing necessary libraries and components
import { MonetizationOn } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../../firebase";
import { changeBytes } from "../common/common";
import { getFilesForUser } from "../common/firebaseApi";
import { CloudQueueIcons, DeleteOutlineIcon, MobileScreenShareIcon, QueryBuilderIcon, StarBorderIcon } from "../common/SvgIcons";

// import "./Sidebar.css";

// SidebarTabs component
const SidebarTabs = () => {
  // State variables

  const [openHelp, setOpenModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [storage, setStorage] = useState("");
  const [size, setSize] = useState("");
  const [openStorageModal, setOpenStorageModal] = useState(false);
  
  // Fetch user files on component mount
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Get user files and set them to state
        const unsubscribeFiles = await getFilesForUser(user.uid, (newFiles) => {
          setFiles(newFiles);
        });

        // Cleanup the user subscription when the component unmounts
        return () => {
          unsubscribeFiles();
        };
      }
    };

    fetchData();
  }, []);

  // Calculate and update storage size whenever files change
  useEffect(() => {
    const sizes = files?.reduce((sum, file) => sum + file.data.size, 0);
    setSize(sizes);
    const storageSize = changeBytes(sizes);
    setStorage(storageSize);
  }, [files]);

  // JSX structure
  return (
    <>
      {/* Help Modal */}

      {/* Sidebar options */}
      <SidebarOptions>
        {/* My Drive */}
        <NavLink to={"/home"}>
          {({ isActive }) => (
            <SidebarOption
              title="My Drive"
              className={isActive ? "tab-active" : ""}
            >
              <MobileScreenShareIcon />
              <span>My Drive</span>
            </SidebarOption>
          )}
        </NavLink>

        {/* Recent */}
        <NavLink to={"/recent"}>
          {({ isActive }) => (
            <SidebarOption
              to={"/recent"}
              className={isActive ? "tab-active" : ""}
              title="Recent"
            >
              <QueryBuilderIcon />
              <span>Recent</span>
            </SidebarOption>
          )}
        </NavLink>

        {/* Starred */}
        <NavLink to={"/starred"}>
          {({ isActive }) => (
            <SidebarOption
              title="Starred"
              className={isActive ? "tab-active" : ""}
            >
              <StarBorderIcon />
              <span>Starred</span>
            </SidebarOption>
          )}
        </NavLink>

        {/* Trash */}
        <NavLink to={"/trash"}>
          {({ isActive }) => (
            <SidebarOption
              title="Trash"
              className={isActive ? "tab-active" : ""}
            >
              <DeleteOutlineIcon />
              <span>Trash</span>
            </SidebarOption>
          )}
        </NavLink>

        {/* Help option */}
        <hr />
        {/* <SidebarOption title="Help" onClick={() => setOpenModal(true)}>
          <HelpIcon />
          <span>Help</span>
        </SidebarOption> */}

        {/* Storage option */}

       <Link to='/subscription'>
       <SidebarOption>
          <MonetizationOn />
          <span>Subscription</span>
        </SidebarOption>
       </Link>

        <SidebarOption
          title={`${storage} of 5 GB used`}
          onClick={() => setOpenStorageModal(true)}
        >
          <CloudQueueIcons />
          <span>Storage</span>
        </SidebarOption>
      </SidebarOptions>

      {/* Storage Modal */}
      <Modal open={openStorageModal} onClose={() => setOpenStorageModal(false)}>
        <ModalPopup>
          <ModalHeading>
            <h3>Storage</h3>
          </ModalHeading>
          <ModalBody>
            <div className="progress_bar">
              <progress size="tiny" value={size} max={5000000000} />
              <span>{storage} of 5 GB used</span>
            </div>
          </ModalBody>
        </ModalPopup>
      </Modal>
    </>
  );
};

// Styled components
const ModalPopup = styled.div`
  top: 50%;
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  margin: 0px auto;
  position: relative;
  transform: translateY(-50%);
  padding: 10px;
  border-radius: 10px;
`;

const ModalHeading = styled.div`
  text-align: center;
  border-bottom: 1px solid lightgray;
  height: 40px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .image {
    width: 100%;
    max-width: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;

    img {
      height: 100%;
      width: 100%;
    }
  }
  h4 {
    margin-bottom: 1rem;
    color: #6b6b6b;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  p {
    margin-bottom: 0.5rem;
    text-decoration: underline;
  }

  .links {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    a {
      display: flex;
      align-items: center;
      gap: 5px;

      &:nth-child(1) {
        color: #000;
      }

      &:nth-child(2) {
        color: #0077b5;
      }

      &:nth-child(3) {
        color: #cc2e96;
      }

      &:nth-child(4) {
        color: #1197f5;
      }
    }
  }

  .progress_bar {
    width: 100%;
    padding: 1rem 20px;

    progress {
      width: 100%;
      padding: 1rem 0;
    }

    span {
      display: block;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const SidebarOptions = styled.div`
  margin-top: 10px;

  a {
    text-decoration: none;
  }

  .tab-active {
    background: whitesmoke;
  }
`;

const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 0px 20px 20px 0px;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
  svg.MuiSvgIcon-root {
    color: rgb(78, 78, 78);
  }
  span {
    margin-left: 15px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(78, 78, 78);

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export default SidebarTabs;
