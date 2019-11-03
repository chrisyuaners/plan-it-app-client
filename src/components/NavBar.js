import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class NavBar extends React.Component {
  state = {
    current: '',
  };

  handleClick = e => {
    localStorage.current = e.key
    this.setState({
      current: e.key,
    });
  };

  componentDidMount() {
    if (localStorage.current) {
      this.setState({
        current: localStorage.current
      })
    } else {
      this.setState({
        current: 'home'
      })
    }
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to={"/home"}>
            <Icon type="home" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="destinations">
          <Link to={"/home/destinations"}>
            <Icon type="rocket" />
            Destinations
          </Link>
        </Menu.Item>
        <Menu.Item key="user">
          <Link to={"/home/profile"}>
            <Icon type="user" />
            Profile
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="setting" />
              Settings
            </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="setting:1">
              <Link to={"/home/profile/edit"}>
                Edit Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={this.props.logout}>
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}

export default NavBar
