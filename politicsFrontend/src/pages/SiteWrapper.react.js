// @flow

import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
  Site,
  Nav,
  Grid,
  List,
  Button,
  RouterContextProvider
} from "tabler-react";

import type { NotificationProps } from "tabler-react";

type Props = {|
  +children: React.Node
|};

type State = {|
  notificationsObjects: Array<NotificationProps>
|};

type subNavItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +LinkComponent?: React.ElementType
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean
|};

const navBarItems: Array<navItem> = [
  {
    value: "Home",
    to: "/home",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true
  },
  {
    value: "Voter Registration Status",
    to: "/vote",
    icon: "check",
    LinkComponent: withRouter(NavLink),
    useExact: true
  },
  // {
  //   value: "My Profile",
  //   to: "/profile",
  //   icon: "aperture",
  //   LinkComponent: withRouter(NavLink),
  //   useExact: true
  // }
];

const accountDropdownProps = {
  name: "Bruce",
  options: [
    { icon: "user", value: "Profile" },
    { isDivider: true },
    { icon: "log-out", value: "Sign out"}
  ]
};

class SiteWrapper extends React.Component {
  state = {
    
     
  };

  render(): React.Node {
    
    return (
      <Site.Wrapper
        headerProps={{
          alt: "PoliDex",
          navItems: <Nav.Item type="div" className="d-none d-md-flex" />,
          accountDropdown: accountDropdownProps
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
