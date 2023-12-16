'use client';
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, MessagesSquare } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import styles from '@/app/table.module.css';

type Props = { collection_id: number };

interface SamplesData {
    id: number; 
    collection_id: number;
    donor_count: number;
    material_type: string; 
    last_updated: Date; 
  }

const SamplesList = ({ collection_id }: Props) => {

  const { data } = useQuery({
    queryKey: ["collection", collection_id],
    queryFn: async () => {
      const response = await axios.post<SamplesData[]>("/api/samples", {
        collection_id,
      });
      return response.data;
    },
  });

  return (
    <div className="max-h-screen">
          {data && data.length > 0 ? (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Collection ID</th>
                    <th>Donor Count</th>
                    <th>Material Type</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.collection_id}</td>
                      <td>{data.donor_count}</td>
                      <td>{data.material_type}</td>
                      <td>{data.last_updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ): (<p>No Samples Record Found</p>
          )}
    </div>
  );
};

export default SamplesList;