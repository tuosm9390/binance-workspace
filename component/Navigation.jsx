import React from 'react';
import NavigationItem from './NavigationItem';
import SubMenu from './SubMenu';
import SubMenuItem from './SubMenuItem';
import MenuItem from './MenuItem';

const Navigation = () => {
  return (
    <nav className="flex items-center h-16 bg-gray-900">
      <NavigationItem label="Markets" />
      <div className="group">
        <NavigationItem label="Trade">
          <SubMenu>
            <SubMenuItem label="Basic">
              <MenuItem label="Spot" />
              <MenuItem label="Margin" />
              <MenuItem label="Convert & Block Trade" />
            </SubMenuItem>
            <SubMenuItem label="Advanced">
              <MenuItem label="Trading Bots" />
              <MenuItem label="Copy Trading" />
              <MenuItem label="APIs" />
            </SubMenuItem>
            <SubMenuItem label="Futures">
              <MenuItem label="USDⓈ-M Futures" />
              <MenuItem label="COIN-M Futures" />
            </SubMenuItem>
          </SubMenu>
        </NavigationItem>
      </div>
      <NavigationItem label="Earn" />
    </nav>
  );
};

export default Navigation;