import React from "react";
import LogoNav from "../images/jLogo_500x500.svg";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

const AppMenu = ({ currentPage }) => {


    return (
        <header className="menu-header">
            <div className="menu-header-brand">
                <Link to='/login'>
                    <Avatar
                        src={LogoNav}
                        shape='square'
                        size='large'
                    />
                </Link>
            </div>
            <Menu
                selectedKeys={currentPage}
                mode="horizontal"
                className="myNav"
                overflowedIndicator={<UnorderedListOutlined />}
            >
                <Menu.Item key="home">
                    <Link to="/">
                        {"{"} Home {"}"}
                    </Link>
                </Menu.Item>
                <Menu.Item key="about">
                    <Link to="/about">
                        {"{"} ...About {"}"}
                    </Link>
                </Menu.Item>
                <Menu.Item key="projects">
                    <Link to="/project">
                        {"{"} ...Projects {"}"}
                    </Link>
                </Menu.Item>
                <Menu.Item key="contact">
                    <Link to="/contact">
                        {"{"} Contact {"}"}
                    </Link>
                </Menu.Item>
                <Menu.Item key="jCode">
                    <Button
                        type="primary"
                        shape="round"
                    >
                        <Link to="/jCode">JCode</Link>
                    </Button>
                </Menu.Item>
            </Menu>
        </header>
    );
};

export default AppMenu;
