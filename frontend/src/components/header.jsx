const headerStyles = {
  headerWrapper: {
    display: "flex",
    padding: "50px",
    justifyContent: "space-between",
    alignItms: "center",
    backgroundColor: "#000",
  },
  logoStyles: {
    fontSize: "30px",
    textDecoration: "none",
    color: "#fff",
  },
  siteNameStyles: {
    color: "#fff",
    fontSize: "50px",
    fontWeight: "bold",
  },
};

const Header = () => {
  return (
    <div className="header-wrapper" style={headerStyles.headerWrapper}>
      <div className="logo">
        <a href="/" style={headerStyles.logoStyles}>
          Logo
        </a>
      </div>
      <div className="company-name">
        <h1 style={headerStyles.siteNameStyles}>Freelancer</h1>
      </div>
    </div>
  );
};
export default Header;
