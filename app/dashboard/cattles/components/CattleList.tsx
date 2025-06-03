"use client";

import { BACKEND_URL } from "@/app/utils/constants";
import { useEffect, useState } from "react";

interface WeightPrediction {
  cattle_rear_url: string;
  weight_predict_id: string;
  date: string;
  cattle_side_url: string;
  weight: number;
  cattle_id: string;
  description: string | null;
}

interface SelectedImage {
  url: string;
  alt: string;
}



export default function CattleList() {
  const [predictions, setPredictions] = useState<WeightPrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/weight-predictions`);
            if (!res.ok) throw new Error("Failed to fetch data");

            const data: WeightPrediction[] = await res.json();

            // Sort by date in descending order
            const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setPredictions(sortedData);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {predictions.map((item) => (
        <div key={item.weight_predict_id} className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Cattle ID: {item.cattle_id}</h2>
          <p className="text-sm text-gray-600">Weight: {item.weight.toFixed(2)} kg</p>
          <p className="text-sm text-gray-600">Date: {item.date}</p>
          {item.description && (
            <p className="text-sm text-gray-600 mb-2">Description: {item.description}</p>
          )}

          <div className="flex gap-4 mt-3">
            <img
              src={item.cattle_side_url}
              alt="Cattle Side"
              className="w-1/2 h-40 object-cover rounded-md cursor-pointer"
              onClick={() =>
                setSelectedImage({
                  url: item.cattle_side_url,
                  alt: "Cattle Side View",
                })
              }
            />
            <img
              src={item.cattle_rear_url}
              alt="Cattle Rear"
              className="w-1/2 h-40 object-cover rounded-md cursor-pointer"
              onClick={() =>
                setSelectedImage({
                  url: item.cattle_rear_url,
                  alt: "Cattle Rear View",
                })
              }
            />
          </div>
        </div>
      ))}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative max-w-full max-h-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded"
            >
              Close
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[90vh] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
