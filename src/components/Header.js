import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item header>Mazu NFT</Menu.Item>
        <Menu.Item
          name="aboutUs"
          active={activeItem === "aboutUs"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="roadmaps"
          active={activeItem === "roadmaps"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="faq"
          active={activeItem === "faq"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
