import "@radix-ui/themes/styles.css";
import { Flex, Text, Button, Card, Theme, Box, Separator } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import React from "react";
import "../styles/styles.css";  // Import the external CSS file

export default function Dashboard() {
  return (
    <Theme>
      <Flex height="100vh">
        {/* Sidebar */}
        <Box className="sidebar">
          <Text className="header">My Dashboard</Text>
          <Separator className="separator" />
          <Flex direction="column" gap="3">
            <Button variant="soft" asChild className="button">
              <Link to="/" style={{ color: "inherit" }}>🏠 Home</Link>
            </Button>
            <Button variant="soft" asChild className="button">
              <Link to="/profile" style={{ color: "inherit" }}>👤 Profile</Link>
            </Button>
            <Button variant="soft" asChild className="button">
              <Link to="/settings" style={{ color: "inherit" }}>⚙️ Settings</Link>
            </Button>
          </Flex>
        </Box>

        {/* Main Content */}
        <Box className="main-content">
          <Text className="header">Welcome to the Dashboard 🎉</Text>
          <Card className="card">
            <Text size="4" style={{ color: "#7392B7" }}>
              This is a sample dashboard layout using Radix UI.
            </Text>
            <Button className="button">Explore More</Button>
          </Card>
        </Box>
      </Flex>
    </Theme>
  );
}