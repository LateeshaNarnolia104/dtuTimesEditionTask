import React from "react";
function ThumbnailImage({ src, alt }) {
  return src ? (
    <img src={src} alt={alt} className="w-14 h-14 rounded object-cover border" />
  ) : (
    <span className="text-gray-500">No image</span>
  );
}
export default ThumbnailImage;
