import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Coffee,
  MapPin,
  Search,
  User,
  Menu,
  X,
  Home,
  Star,
  LogOut,
  LogIn,
  UserPlus,
  Settings,
  Bell,
  ShoppingBag,
  HelpCircle,
  TrendingUp,
  Filter,
  Coffee as CoffeeIcon,
  Sparkles,
} from "lucide-react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ganti dengan state auth yang sebenarnya

  // Mock user data
  const user = {
    name: "Coffee Explorer",
    email: "explorer@coffee.dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=coffee",
    role: "user", // atau 'admin'
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  // Navigation items
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-4 h-4" />,
      badge: null,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <MapPin className="w-4 h-4" />,
      badge: null,
    },
    {
      name: "Featured",
      path: "/featured",
      icon: <Star className="w-4 h-4" />,
      badge: null,
    },
    // {
    //   name: "Trending",
    //   path: "/trending",
    //   icon: <TrendingUp className="w-4 h-4" />,
    //   badge: null,
    // },
    // {
    //   name: "Categories",
    //   path: "/categories",
    //   icon: <Filter className="w-4 h-4" />,
    //   badge: null,
    // },
  ];

  // User menu items
  const userMenuItems = [
    {
      name: "My Profile",
      path: "/profile",
      icon: <User className="w-4 h-4" />,
      divider: false,
    },
    {
      name: "My Favorites",
      path: "/favorites",
      icon: <Star className="w-4 h-4" />,
      badge: "12",
      divider: false,
    },
    {
      name: "My Reviews",
      path: "/reviews",
      icon: <Sparkles className="w-4 h-4" />,
      divider: false,
    },
    {
      name: "Booking History",
      path: "/bookings",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: "3",
      divider: true,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="w-4 h-4" />,
      divider: false,
    },
    {
      name: "Help & Support",
      path: "/help",
      icon: <HelpCircle className="w-4 h-4" />,
      divider: false,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut className="w-4 h-4" />,
      action: () => setIsLoggedIn(false),
      divider: false,
    },
  ];

  // Auth menu items (when not logged in)
  const authMenuItems = [
    {
      name: "Login",
      path: "/login",
      icon: <LogIn className="w-4 h-4" />,
    },
    {
      name: "Register",
      path: "/register",
      icon: <UserPlus className="w-4 h-4" />,
      highlight: true,
    },
  ];

  // Admin menu items
  const adminMenuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      name: "Add Coffee Shop",
      path: "/admin/add-shop",
      icon: <CoffeeIcon className="w-4 h-4" />,
    },
    {
      name: "Manage Shops",
      path: "/admin/shops",
      icon: <Filter className="w-4 h-4" />,
    },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Header Container */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-lg"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-coffee-600 to-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-coffee-600 to-primary bg-clip-text text-transparent font-code">
                    CoffeLoc
                  </span>
                </h1>
                {/* <p className="text-xs text-gray-500 font-code">Find your perfect brew</p> */}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-coffee-50 text-coffee-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-coffee-600 to-primary rounded-t-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden md:block relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search coffee shops..."
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent w-64 transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-coffee-600 hover:text-coffee-700"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Notification Bell */}
              {/* <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button> */}

              {/* User Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border-2 border-coffee-200"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name.split(" ")[0]}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                    </div>
                  </button>

                  {/* Dropdown User Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-slide-up">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border-2 border-coffee-200"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-coffee-100 text-coffee-700 rounded-full text-xs font-medium">
                              <Sparkles className="w-3 h-3" />
                              {user.role === "admin" ? "Admin" : "Coffee Explorer"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item, index) => (
                          <React.Fragment key={item.name}>
                            <Link
                              to={item.path}
                              onClick={() => {
                                setIsUserMenuOpen(false);
                                if (item.action) item.action();
                              }}
                              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-gray-500 group-hover:text-coffee-600">
                                  {item.icon}
                                </div>
                                <span className="text-gray-700 group-hover:text-gray-900">
                                  {item.name}
                                </span>
                              </div>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-coffee-100 text-coffee-700 text-xs font-bold rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                            {item.divider && <div className="border-t border-gray-100 my-1" />}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Admin Section (if admin) */}
                      {user.role === "admin" && (
                        <>
                          <div className="border-t border-gray-100 my-1" />
                          <div className="px-4 py-2">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                              Admin Panel
                            </div>
                            {adminMenuItems.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-coffee-600 hover:bg-coffee-50 rounded-lg transition-colors group"
                              >
                                <div className="text-gray-500 group-hover:text-coffee-600">
                                  {item.icon}
                                </div>
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Login/Register Buttons
                <div className="hidden lg:flex items-center gap-2">
                  {authMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        item.highlight
                          ? "bg-gradient-to-r from-coffee-600 to-primary text-white hover:shadow-lg hover:scale-105"
                          : "text-gray-700 hover:text-coffee-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden border-t border-gray-100 pt-3 pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coffee shops, locations, types..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="container mx-auto px-4 py-3">
              {/* Mobile Navigation Links */}
              <div className="space-y-1 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive(item.path)
                        ? "bg-coffee-50 text-coffee-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isActive(item.path) ? "bg-coffee-100" : "bg-gray-100"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Section */}
              {!isLoggedIn ? (
                <div className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {authMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-4 py-3 rounded-xl font-medium text-center transition-all ${
                          item.highlight
                            ? "bg-gradient-to-r from-coffee-600 to-primary text-white hover:shadow-lg"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-coffee-200"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-3 py-2 bg-coffee-50 text-coffee-700 rounded-lg text-center text-sm font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-center text-sm font-medium"
                    >
                      Favorites
                    </Link>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              {/* <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">QUICK STATS</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-coffee-50 rounded-lg">
                    <div className="font-bold text-coffee-700">12</div>
                    <div className="text-xs text-gray-600">Favorites</div>
                  </div>
                  <div className="text-center p-2 bg-amber-50 rounded-lg">
                    <div className="font-bold text-amber-700">8</div>
                    <div className="text-xs text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-700">24</div>
                    <div className="text-xs text-gray-600">Visited</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </nav>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
