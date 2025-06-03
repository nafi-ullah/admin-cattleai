"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/app/utils/constants";
import CattleShow from "./component/CattleShow";


interface WeightPrediction {
  weight_predict_id: string;
  cattle_id: string;
  cattle_side_url: string;
  cattle_rear_url: string;
  weight: number;
  date: string;
  description: string | null;
}

export interface Cattle {
  cattle_id: string;
  name: string;
  age: number;
  color: string;
  teeth_number: number;
  foods: string;
  price: number;
  gender: string;
  description: string;
  weight_predictions: WeightPrediction[];
}

interface UserInfoProps {
  params: {
    userid: string;
  };
}

export default function UserCattleInfo({ params }: UserInfoProps) {
  const [cattleData, setCattleData] = useState<Cattle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/cattles/${params.userid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Cattle[] = await response.json();
        setCattleData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.userid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <CattleShow cattles={cattleData} />
    </div>
  );
}
