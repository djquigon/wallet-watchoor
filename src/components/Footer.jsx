import "../style/Footer.module.css";

const Footer = () => {
  const today = new Date();
  return (
    <footer>
      <a href="https://twitter.com/WalletWatchoor">Twitter 🐦</a>
      <a href="https://discord.gg/bEHR7pcvU4">Discord 💬</a>
      <p>Copyright &copy; {today.getFullYear()}</p>
      <a href="https://github.com/djquigon/wallet-watchoor/issues">
        Bug Report 🐛
      </a>
      <a href="https://github.com/djquigon/wallet-watchoor/issues">
        Feature Request 🆕
      </a>
    </footer>
  );
};

export default Footer;
