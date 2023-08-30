import Link from "next/link";
const NavItem = ({ text, href, active }) => {
  const className =
    text === "Home"
      ? "nav__item HomeMenu"
      : `nav__item ${active ? "active" : ""}`;
  return (
    <Link href={href}>
      <span className={className}>{text}</span>
    </Link>
  );
};

export default NavItem;
