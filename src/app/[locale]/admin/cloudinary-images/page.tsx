"use client";
import { useEffect, useState } from "react";

const IMAGES_PER_PAGE = 8;

const AdminImageManager = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/cloudinary/list");
      const data = await res.json();
      setImages(data.resources || []);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const handleDelete = async (imageUrl: string) => {
    const confirmed = confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;

    const res = await fetch(
      `/api/upload/deleteImage?imageUrl=${encodeURIComponent(imageUrl)}`,
      { method: "DELETE" }
    );
    const data = await res.json();
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.secure_url !== imageUrl));
    } else {
      alert(data.message || "Failed to delete image");
    }
  };

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {paginatedImages.map((img) => (
          <div key={img.asset_id} className="relative border rounded">
            <img
              src={img.secure_url}
              alt={img.public_id}
              className="w-full h-auto"
            />
            {img.inUse && (
              <div className="absolute bottom-1 left-1 bg-yellow-500 text-white px-2 py-0.5 text-xs rounded">
                In Use
              </div>
            )}
            <button
              onClick={() => handleDelete(img.secure_url)}
              disabled={img.inUse}
              className={`absolute top-1 right-1 p-1 rounded text-sm ${
                img.inUse
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default AdminImageManager;
