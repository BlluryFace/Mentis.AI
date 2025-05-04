import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css'; // Ensure correct path

function Navbar() {
    return (
        <Flex as="nav" align="center" gap="4" p="3" className={styles.appNav}>
            <div className={styles.logo}>Reflect journal</div>
            <Flex gap="3" align="center" ml="4">
                <NavLink
                    to="/" // Changed to "/" for the TimeCapsulePage (as per your App.js routes)
                    className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                    Time Capsule
                </NavLink>
                <NavLink
                    to="/mood-tunes"
                    className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                    Mood Tunes
                </NavLink>
                <NavLink
                    to="/journal"
                    className={({ isActive }) => isActive ? styles.navLinkActive : styles.navLink}
                >
                    Journal
                </NavLink>
            </Flex>
        </Flex>
    );
}

export default Navbar;