import React, { useState } from "react";
import { Star, ThumbsUp, MessageCircle, MoreVertical, CheckCircle } from "lucide-react";

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);
  const [showFull, setShowFull] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (seed) => {
    const colors = [
      "bg-gradient-to-br from-amber-500 to-orange-500",
      "bg-gradient-to-br from-blue-500 to-cyan-500",
      "bg-gradient-to-br from-purple-500 to-pink-500",
      "bg-gradient-to-br from-green-500 to-emerald-500",
      "bg-gradient-to-br from-red-500 to-rose-500",
    ];
    return colors[seed % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-coffee-300 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-12 h-12 ${getRandomColor(review.userId)} rounded-xl flex items-center justify-center text-white font-bold text-lg`}
          >
            {getInitials(review.userName)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900">{review.userName}</h4>
              {review.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p
          className={`text-gray-700 ${!showFull && review.content.length > 200 ? "line-clamp-3" : ""}`}
        >
          {review.content}
        </p>

        {review.content.length > 200 && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-coffee-600 hover:text-coffee-700 font-medium text-sm mt-2"
          >
            {showFull ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Photos if any */}
      {review.photos && review.photos.length > 0 && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={photo}
                alt={`Review photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tags if any */}
      {review.tags && review.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {review.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-coffee-50 text-coffee-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              liked ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? "fill-red-600" : ""}`} />
            <span className="font-medium">{likeCount}</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">Reply</span>
          </button>
        </div>

        <div className="text-sm text-gray-500">{review.helpful} people found this helpful</div>
      </div>
    </div>
  );
};

// Sample review data structure
ReviewCard.defaultProps = {
  review: {
    id: 1,
    userName: "Alex Coffee Explorer",
    userId: 1,
    verified: true,
    rating: 5,
    date: "2 days ago",
    content:
      "Absolutely love this place! The coffee is consistently excellent and the workspace is perfect for getting things done. The baristas are knowledgeable and friendly, always willing to recommend something new to try. The atmosphere strikes the perfect balance between cozy and productive.",
    photos: [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    ],
    tags: ["Great Coffee", "Friendly Staff", "Perfect Workspace"],
    likes: 24,
    helpful: 18,
  },
};

export default ReviewCard;
