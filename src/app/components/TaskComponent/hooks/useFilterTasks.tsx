/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/app/connection/supabaseclient";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function useFilterTasks(
  filter: string,
  isCategory: boolean | null,
  category_id: number
) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);

    let data, error;

    try {
      // 🟦 1) Ako je filtriranje po kategoriji
      if (isCategory !== null && category_id !== 0) {
        ({ data, error } = await supabase
          .from("Users_Tasks")
          .select("tasks(*)")
          .eq("tasks.category_id", category_id)
          .eq("tasks.Deleted", false)
          .eq("User_id", user?.id)
          .order("Task_id", { ascending: true })
        );
      }

      // 🟦 2) Bez kategorije → primeni filtere
      else {
        const today = new Date().toISOString().split("T")[0];

        if (filter === "Today") {
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*)")
            .eq("tasks.date", today)
            .eq("tasks.Deleted", false)
            .eq("User_id", user?.id));
        }

        else if (filter === "7Days") {
          const date = new Date();
          const next7 = new Date(date.setDate(date.getDate() + 7))
            .toISOString()
            .split("T")[0];

          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*)")
            .gte("tasks.date", today)
            .lte("tasks.date", next7)
            .eq("tasks.Deleted", false)
            .eq("User_id", user?.id));
        }

        else if (filter === "Completed") {
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*)")
            .eq("tasks.Completed", true)
            .eq("tasks.Deleted", false)
            .eq("User_id", user?.id));
        }

        else if (filter === "Deleted") {
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*)")
            .eq("tasks.Deleted", true)
            .eq("User_id", user?.id));
        }

        else {
          // default – sve taskove
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*)")
            .eq("User_id", user?.id));
        }
      }

      if (error) {
        console.error("Supabase error:", error.message);
        setTasks([]);
      } else {
        // 🟩 OVDE JE GLAVNI FIX → izvući tasks iz svake veze
       const extracted = (data || [])
  .map((item: any) => item.tasks)
  .filter((t: any) => t !== null);
        setTasks(extracted);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setTasks([]);
    }

    setLoading(false);
  };

  // 🟦 Subscriptions + filter refetch
  useEffect(() => {
    fetchData();

    const subscription = supabase
      .channel("custom-all-channel")
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "tasks" },
        (payload) => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === payload.new.id ? payload.new : t
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [filter, isCategory, category_id]);

  return {
    tasks,
    loading,
    refresh: fetchData,
  };
}
