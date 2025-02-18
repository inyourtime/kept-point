import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Gift, Home, LogOut, Menu, CircleUser, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/useProfile";
import Loader from "./Loader";
import PointBadge from "./PointBadge";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: prfile, isPending } = useProfile();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Kept Point
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
          <NavItem
            to="/reward"
            icon={<Gift className="h-5 w-5" />}
            label="Reward"
          />

          <PointBadge
            point={prfile?.point || 0}
            className="text-sm mr-3 bg-gray-800"
            variant={"default"}
          />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out hover:shadow-sm hover:scale-[1.02] cursor-pointer">
                {/* Added cursor-pointer */}
                <CircleUser className="h-5 w-5" />
                {/* <span>Profile</span> */}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <PointBadge
            point={prfile?.point || 0}
            className="text-sm mr-3 bg-gray-800"
            variant={"default"}
          />
          {/* Example points */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Menu</h2>
              </div>
              <div className="flex flex-col space-y-4">
                <NavItem
                  to="/"
                  icon={<Home className="h-5 w-5" />}
                  label="Home"
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  to="/reward"
                  icon={<Gift className="h-5 w-5" />}
                  label="Reward"
                  onClick={() => setOpen(false)}
                />
                <NavItem
                  to="/profile"
                  icon={<User className="h-5 w-5" />}
                  label="Profile"
                  onClick={() => setOpen(false)}
                />
                <LogoutButton onClick={handleLogout} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

// Reusable Navigation Item Component
const NavItem = ({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    // className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition"
    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 ease-in-out hover:shadow-sm hover:scale-[1.02]"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const LogoutButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    // className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition"
    className="flex items-center space-x-2 px-3 py-2 rounded-md text-red-600 hover:text-red-100 hover:bg-red-500 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.02] active:scale-95"
  >
    <LogOut className="h-5 w-5" />
    <span className="md:hidden">Logout</span>
  </button>
);

export default Navbar;
