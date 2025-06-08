import React, { createContext, useMemo, useState, useCallback } from "react";

export const SidebarContext = createContext();

function DrawerContext({ children }) {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [progress, setProgress] = useState(0);
  const toggleDrawer = useCallback(() => setMobileDrawer((prev) => !prev), []);
  const value = useMemo(() => ({ mobileDrawer, toggleDrawer, progress, setProgress }), 
  [mobileDrawer, progress, toggleDrawer]);
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default DrawerContext;
