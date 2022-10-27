import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        create by{' '}
        <span className={styles.span}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/savchukrm"
          >
            savchukrm
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
