"use client";

import { useState } from "react";
import Image from "next/image";
import { Cattle } from "../page";

interface CattleShowProps {
  cattles: Cattle[];
}

interface SelectedImage {
  url: string;
  alt: string;
}

export default function CattleShow({ cattles }: CattleShowProps) {
  const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  return (
    <div>
      {/* Grid of cattle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cattles.map((cattle) => (
          <div
            key={cattle.cattle_id}
            onClick={() => setSelectedCattle(cattle)}
            className="cursor-pointer border rounded-2xl shadow p-4 hover:shadow-lg transition-all bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{cattle.name}</h2>
            <p className="text-sm text-gray-500 mb-1">Age: {cattle.age}</p>
            <p className="text-sm text-gray-500 mb-1">Color: {cattle.color}</p>
            <p className="text-sm text-gray-500 mb-1">Price: ${cattle.price}</p>
            <img
              src={cattle.weight_predictions[0]?.cattle_side_url || ""}
              alt={`${cattle.name} image`}
              width={400}
              height={300}
              className="rounded-md object-cover mt-2"
            />
          </div>
        ))}
      </div>

      {/* Cattle detail modal */}
      {selectedCattle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl overflow-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedCattle(null)}
              className="text-red-500 font-bold text-sm absolute top-4 right-4"
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedCattle.name}</h2>

           


              <div>
              
                                <div className="grid grid-cols-3">
                <p><strong>Age:</strong> {selectedCattle.age}</p>
                <p><strong>Color:</strong> {selectedCattle.color}</p>
                <p><strong>Gender:</strong> {selectedCattle.gender}</p>
                <p><strong>Teeth:</strong> {selectedCattle.teeth_number}</p>
                <p><strong>Foods:</strong> {selectedCattle.foods}</p>
                <p><strong>Price:</strong> ${selectedCattle.price}</p>
                <p><strong>Description:</strong> {selectedCattle.description}</p>
              </div>
               
                <h3 className="text-lg font-semibold mb-2">Weight Predictions</h3>
                {selectedCattle.weight_predictions.map((wp) => (
                  <div key={wp.weight_predict_id} className="mb-4">
                    <p><strong>Date:</strong> {wp.date}</p>
                    <p><strong>Weight:</strong> {wp.weight.toFixed(2)} kg</p>
                    <div className="flex gap-2 mt-2">
                      <img
                        src={wp.cattle_side_url}
                        alt="Side view"
                        className="rounded-md w-1/2 cursor-pointer"
                        onClick={() =>
                          setSelectedImage({
                            url: wp.cattle_side_url,
                            alt: "Side view",
                          })
                        }
                      />
                      <img
                        src={wp.cattle_rear_url}
                        alt="Rear view"
                        className="rounded-md w-1/2 cursor-pointer"
                        onClick={() =>
                          setSelectedImage({
                            url: wp.cattle_rear_url,
                            alt: "Rear view",
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      
      )}

      {/* Large image viewer */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 text-white bg-red-600 px-3 py-1 rounded-full m-2"
            >
              Close
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
