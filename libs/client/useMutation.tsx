import React, { useState } from "react";
import axios from "axios";

type UseMutationState<T>={
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];
export default function useMutation<T=any>(url: string):UseMutationResult<T>{
  const [chunk, setChunk] = useState<UseMutationState<T>>({loading: false,data: undefined,error: undefined,});

  function mutation(data: any) {
    setChunk((prev) => ({ ...prev, loading: true }));
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
      .then((res) => res.json().catch(() => {}))
      .then((data)=>setChunk((prev)=>({...prev,data})))
      .catch((error)=>setChunk((prev)=>({...prev,error})))
      .finally(() => setChunk((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...chunk }];
}
