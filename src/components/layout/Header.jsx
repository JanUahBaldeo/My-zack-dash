// ========================================
// 🎯 HEADER COMPONENT WITH ALIASED IMPORTS
// ========================================

import { SearchBox, ProfileInfo } from '@components';
import RoleSwitcher from './RoleSwitcher';
import { motion } from 'framer-motion';
import { useRole } from '@context/RoleContext';
import styles from './Header.module.css';

const Header = () => {
  const { currentRole } = useRole();
  // Mock user data
  const displayName = 'Demo User';
  const greeting = `Welcome back, ${displayName}`;
  const subtext = "Let's take a detailed look at your financial situation today";

  return (
    <header className={styles.headerGradient}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${styles.container} ${styles.fadeInUp}`}
      >
        {/* Left: Logo + Greeting */}
        <div className={styles.logoSection}>
          <img
            src="https://i.ibb.co/rK44TsnC/logo.png"
            alt="logo"
            className={styles.logo}
          />
          <div className={styles.greeting}>
            <h1 className={styles.titleGlow}>
              {greeting}
            </h1>
            <div className={styles.underlineGradient} />
            <p className={styles.subtitle}>
              {subtext}
            </p>
          </div>
        </div>
        {/* Right: Search + Role Switcher + Profile */}
        <div className={styles.actionsGlassy}>
          <SearchBox />
          <RoleSwitcher />
          <ProfileInfo />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
