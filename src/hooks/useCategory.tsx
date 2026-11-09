import { useEffect, useState } from "react";
import { type Category } from "../types/types";
import { useAuth } from "../components/AuthContext";

type ApiCategories = {
  cat_desc: string;
  cat_id: string;
  cat_name: string;
  created_at: string;
}

type ResponseType = {
  msg: string;
  result: ApiCategories[];
}

export const useCategory = () => {
  const { user, isInitializing, apiFetch } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const parseCategory = (cat: ApiCategories): Category => {
    return {
      id: cat.cat_id,
      name: cat.cat_name,
      desc: cat.cat_desc
    }
  }

  const fetchCategories = async() => {
    try {
      
      const res = await apiFetch("/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data: ResponseType = await res.json();
      if(!res.ok) {
        console.log(data.msg);
        setError(data.msg)
        return;
      }

      setCategories(
        data.result.map(cat => parseCategory(cat))
      );

      setError(null);

    } catch (error) {
      console.error(error);
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!user || isInitializing) return;
    void fetchCategories();
  }, [user, isInitializing, apiFetch])

  return {
    categories,
    loadingCategories, 
    error,
  }

}