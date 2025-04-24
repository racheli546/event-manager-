// src/contexts/ProducerContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

export type Producer = {
  name: string;
  phone: string;
  email: string;
  description?: string;
};

type ProducerContextType = {
  producer: Producer | null;
  setProducer: (producer: Producer) => void;
  clearProducer: () => void;
};

const ProducerContext = createContext<ProducerContextType | undefined>(undefined);

export const ProducerProvider = ({ children }: { children: React.ReactNode }) => {
  const [producer, setProducerState] = useState<Producer | null>(null);

  // ⬅️ טוען מה-localStorage כשהאפליקציה עולה
  useEffect(() => {
    const stored = localStorage.getItem("producer");
    if (stored) {
      setProducerState(JSON.parse(stored));
    }
  }, []);

  const setProducer = (producer: Producer) => {
    setProducerState(producer);
    localStorage.setItem("producer", JSON.stringify(producer)); // ⬅️ שמירה ב-localStorage
  };

  const clearProducer = () => {
    setProducerState(null);
    localStorage.removeItem("producer"); // ⬅️ ניקוי מה-localStorage
  };

  return (
    <ProducerContext.Provider value={{ producer, setProducer, clearProducer }}>
      {children}
    </ProducerContext.Provider>
  );
};

export const useProducer = () => {
  const context = useContext(ProducerContext);
  if (!context) {
    throw new Error("useProducer must be used within a ProducerProvider");
  }
  return context;
};
