import HeaderClient from "./HeaderClient";

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
  return <HeaderClient isLoggedIn={isLoggedIn} />;
}
