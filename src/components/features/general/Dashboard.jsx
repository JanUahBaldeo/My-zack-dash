// ========================================
// 🎯 DASHBOARD COMPONENT WITH ALIASED IMPORTS
// ========================================

import { Header } from '@components';
import { MarketingSection, PipelineSection, CampaignSection, TaskSection, CalendarSection } from '@components';
import styles from './Dashboard.module.css';

const Dashboard = () => (
  <div className={styles.container}>
    <Header />

    <main className={styles.main}>
      {/* Pipeline Section */}
      <section className={`${styles.section} ${styles.sectionPipeline}`}>
        <PipelineSection isAdmin={true} />
      </section>

      {/* Marketing Section */}
      <section className={`${styles.section} ${styles.sectionPipeline}`}>
        <MarketingSection />
      </section>

      {/* Campaigns */}
      <section className={`${styles.section} ${styles.sectionCampaign}`}>
        <CampaignSection />
      </section>

      {/* Tasks */}
      <section className={`${styles.section} ${styles.sectionTasks}`}>
        <TaskSection />
      </section>

      {/* Calendar */}
      <section className={`${styles.section} ${styles.sectionCalendar}`}>
        <CalendarSection />
      </section>
    </main>
  </div>
);

export default Dashboard;
