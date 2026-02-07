import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  Star,
  Wifi,
  Battery,
  Car,
  Wind,
  Coffee,
  ArrowLeft,
  Heart,
  Share2,
  Navigation,
  Phone,
  Globe,
  Instagram,
  Users,
  Thermometer,
  Droplets,
  Tag,
  Award,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle,
} from "lucide-react";
import data from "../Data/coffeeshop.json";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Debug: Cek struktur data
  useEffect(() => {
    console.log("Data structure:", data);
    console.log("Coffee shops array:", data.coffeeShops);
    console.log("Looking for ID:", id);

    // Cari shop berdasarkan ID
    const shop = data.coffeeShops.find((shop) => shop.id === parseInt(id));
    console.log("Found shop:", shop);

    if (shop) {
      setCoffeeShop(shop);

      // Cek favorite
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(shop.id));
    }
  }, [id]);

  // Loading state
  if (!coffeeShop) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coffee-300 border-t-coffee-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coffee shop...</p>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((favId) => favId !== coffeeShop.id)
      : [...favorites, coffeeShop.id];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: coffeeShop.name,
        text: `Check out ${coffeeShop.name} - ${coffeeShop.tagline}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coffeeShop.latitude},${coffeeShop.longitude}`;
    window.open(url, "_blank");
  };

  const amenitiesIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    outlet: <Battery className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    ac: <Wind className="w-5 h-5" />,
    quiet: <Sparkles className="w-5 h-5" />,
    workspace: <Zap className="w-5 h-5" />,
    toilet: <CheckCircle className="w-5 h-5" />,
    terrace: <Thermometer className="w-5 h-5" />,
    roastery: <Coffee className="w-5 h-5" />,
    specialty: <Award className="w-5 h-5" />,
    training: <Users className="w-5 h-5" />,
    garden: <Droplets className="w-5 h-5" />,
    fast: <Zap className="w-5 h-5" />,
    "24h": <Clock className="w-5 h-5" />,
    delivery: <Navigation className="w-5 h-5" />,
    dessert: <Tag className="w-5 h-5" />,
    mall: <Tag className="w-5 h-5" />,
  };

  const amenitiesLabels = {
    wifi: "Free WiFi",
    outlet: "Power Outlets",
    parking: "Parking Available",
    ac: "Air Conditioned",
    quiet: "Quiet Environment",
    workspace: "Workspace Friendly",
    toilet: "Clean Toilet",
    terrace: "Outdoor Seating",
    roastery: "On-site Roastery",
    specialty: "Specialty Coffee",
    training: "Coffee Workshops",
    garden: "Garden View",
    fast: "Quick Service",
    "24h": "Open 24/7",
    delivery: "Delivery Available",
    dessert: "Dessert Menu",
    mall: "Mall Location",
  };

  // Handle jika amenities tidak ada
  const amenities = coffeeShop.amenities || [];
  const displayedAmenities = showAllAmenities ? amenities : amenities.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 via-white to-coffee-25">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <ArrowLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Action Buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button
          onClick={toggleFavorite}
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
        >
          <Heart
            className={`w-6 h-6 transition-all ${
              isFavorite
                ? "fill-red-500 text-red-500 group-hover:scale-110"
                : "text-gray-800 group-hover:text-red-500"
            }`}
          />
        </button>

        <button
          onClick={shareLocation}
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Share2 className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20">
        {/* Image Gallery */}
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 group">
          <img
            src={coffeeShop.images?.[currentImageIndex] || coffeeShop.image}
            alt={coffeeShop.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Image Navigation */}
          {coffeeShop.images && coffeeShop.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? coffeeShop.images.length - 1 : prev - 1,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === coffeeShop.images.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {coffeeShop.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Tags Badge */}
          <div className="absolute top-6 left-6 flex gap-2">
            {coffeeShop.featured && (
              <span className="px-3 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-full backdrop-blur-sm border border-amber-300/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            {coffeeShop.trending && (
              <span className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-full backdrop-blur-sm border border-red-300/30 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Trending
              </span>
            )}
            {coffeeShop.new && (
              <span className="px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full backdrop-blur-sm border border-green-300/30">
                New
              </span>
            )}
          </div>
        </div>

        {/* Main Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                {coffeeShop.name}
              </h1>
              <p className="text-xl text-gray-700 mb-6">{coffeeShop.tagline}</p>

              {/* Rating & Location */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(coffeeShop.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{coffeeShop.rating}</span>
                  <span className="text-gray-500">({coffeeShop.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{coffeeShop.distance} away</span>
                </div>

                <div className="px-3 py-1.5 bg-coffee-100 text-coffee-800 rounded-full text-sm font-medium">
                  {coffeeShop.priceRange}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{coffeeShop.description}</p>
            </div>

            {/* Coffee Types */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6 text-coffee-600" />
                Coffee Specialties
              </h2>
              <div className="flex flex-wrap gap-3">
                {(coffeeShop.coffeeTypes || []).map((type, index) => (
                  <span
                    key={index}
                    className="px-4 py-2.5 bg-gradient-to-r from-coffee-50 to-coffee-100 text-coffee-800 rounded-xl font-medium border border-coffee-200 hover:border-coffee-300 transition-colors"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">What's here</h2>
                {amenities.length > 6 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-coffee-600 hover:text-coffee-700 font-medium flex items-center gap-1"
                  >
                    {showAllAmenities ? "Show less" : "See all"}
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {displayedAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-coffee-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-coffee-50 rounded-lg text-coffee-600 group-hover:scale-110 transition-transform">
                        {amenitiesIcons[amenity] || <Tag className="w-5 h-5" />}
                      </div>
                      <span className="font-medium text-gray-900">
                        {amenitiesLabels[amenity] || amenity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Action Card */}
            <div className="sticky top-6 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Status Bar */}
              <div className="bg-gradient-to-r from-coffee-600 to-coffee-800 p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Open until {coffeeShop.openUntil}</span>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {coffeeShop.workFriendly ? "💼 Work Friendly" : "☕ Coffee Only"}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-coffee-600" />
                    <span className="flex-1">{coffeeShop.address}</span>
                  </div>

                  {coffeeShop.phone && (
                    <a
                      href={`tel:${coffeeShop.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-coffee-600 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-coffee-600" />
                      <span>{coffeeShop.phone}</span>
                    </a>
                  )}

                  {coffeeShop.website && (
                    <a
                      href={coffeeShop.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-coffee-600 transition-colors"
                    >
                      <Globe className="w-5 h-5 text-coffee-600" />
                      <span className="truncate">{coffeeShop.website.replace("https://", "")}</span>
                    </a>
                  )}

                  {coffeeShop.instagram && (
                    <a
                      href={`https://instagram.com/${coffeeShop.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-coffee-600 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-coffee-600" />
                      <span>{coffeeShop.instagram}</span>
                    </a>
                  )}
                </div>

                {/* Opening Hours */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-coffee-600" />
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {coffeeShop.openingHours &&
                      Object.entries(coffeeShop.openingHours).map(([day, hours]) => (
                        <div
                          key={day}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-gray-600 capitalize">{day}</span>
                          <span className="font-medium text-gray-900">{hours}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={openMaps}
                    className="w-full bg-coffee-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-coffee-700 transition-colors flex items-center justify-center gap-3 group"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  {coffeeShop.phone && (
                    <button
                      onClick={() => window.open(`tel:${coffeeShop.phone}`, "_self")}
                      className="w-full bg-white border-2 border-coffee-600 text-coffee-600 py-3.5 rounded-xl font-bold text-lg hover:bg-coffee-50 transition-colors"
                    >
                      Call Now
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="mt-6 bg-gradient-to-br from-gray-900 to-coffee-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Rating</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-xl">{coffeeShop.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Reviews</span>
                  <span className="font-bold text-xl">{coffeeShop.reviewCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Distance</span>
                  <span className="font-bold text-xl">{coffeeShop.distance}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Price Range</span>
                  <span className="font-bold text-xl">{coffeeShop.priceRange}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-2">Updated</p>
                  <p className="font-medium">
                    {new Date(coffeeShop.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vibes & Atmosphere</h2>
          <div className="flex flex-wrap gap-3">
            {(coffeeShop.tags || []).map((tag, index) => (
              <span
                key={index}
                className="px-5 py-3 bg-gradient-to-r from-coffee-50 to-amber-50 text-gray-800 rounded-xl font-medium border border-amber-200 hover:border-amber-300 transition-all hover:scale-105 shadow-sm hover:shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Bottom Bar (Mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900">{coffeeShop.name}</div>
              <div className="text-sm text-gray-600">{coffeeShop.distance} away</div>
            </div>

            <button
              onClick={openMaps}
              className="bg-coffee-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-coffee-700 transition-colors flex items-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .coffee-steam {
          position: absolute;
          width: 60px;
          height: 80px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent);
          border-radius: 50% 50% 0 0;
          opacity: 0.6;
          filter: blur(10px);
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          animation: steam-rise 4s ease-in-out infinite;
        }

        @keyframes steam-rise {
          0% {
            transform: translateX(-50%) translateY(0) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(-50%) translateY(-100px) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Animated Coffee Cup (Decorative) */}
      <div className="fixed bottom-24 right-6 z-30 hidden lg:block">
        <div className="relative">
          <div className="w-16 h-20 bg-gradient-to-b from-coffee-300 to-coffee-600 rounded-b-2xl rounded-t-sm relative overflow-hidden">
            {/* Coffee liquid */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-b from-coffee-800 to-coffee-900 rounded-b-2xl">
              {/* Coffee bubbles */}
              <div className="absolute top-2 left-4 w-2 h-2 bg-amber-200/30 rounded-full animate-pulse" />
              <div
                className="absolute top-4 right-6 w-3 h-3 bg-amber-200/40 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-6 left-8 w-1.5 h-1.5 bg-amber-200/20 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Coffee steam */}
            <div className="coffee-steam" style={{ animationDelay: "0.5s" }} />
            <div
              className="coffee-steam"
              style={{ left: "40%", animationDelay: "1s", width: "40px" }}
            />
            <div
              className="coffee-steam"
              style={{ left: "60%", animationDelay: "1.5s", width: "50px" }}
            />
          </div>

          {/* Handle */}
          <div className="absolute top-4 -right-3 w-6 h-10 border-4 border-coffee-300 rounded-r-full" />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
