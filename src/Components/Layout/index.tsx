import { Outlet } from "react-router-dom";

import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import FooterApp from "./Footer";
import HeaderApp from "./Header";

const Layout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside hiddenBreakpoint="sm" p="md" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          <FooterApp />
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%",justifyContent:"stretch"}}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                color={theme.colors.gray[6]}
                mr="xl"
                onClick={() => setOpened((o) => !o)}
                opened={opened}
                size="sm"
              />
            </MediaQuery>
            <HeaderApp />
          </div>
        </Header>
      }
      navbar={
        <Navbar
          hidden={!opened}
          hiddenBreakpoint="sm"
          p="md"
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      asideOffsetBreakpoint="sm"
      fixed
      navbarOffsetBreakpoint="sm"
    >
      <Outlet />
    </AppShell>
  );
};
export default Layout;
