/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/app/connection/supabaseclient";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function useFilterTasks(
  filter: string,
  isCategory: boolean | null,
  
  category_id: number,
  isTag:boolean | null,
  TagId:number,
) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);

    let data, error;

    try {
     
      if (isCategory !== null && category_id !== 0) {
        ({ data, error } = await supabase
          .from("Users_Tasks")
          .select("tasks(*,tags_tasks(*,Tags(*)))")
          .eq("tasks.category_id", category_id)
          .eq("tasks.Deleted", false)
          .eq("User_id", user?.id)
          .order("Task_id", { ascending: true })
        );
      }

   
      else {
        const today = new Date().toISOString().split("T")[0];

        if (filter === "Today") {
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*,tags_tasks(*,Tags(*)))")
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
            .select("tasks(*,tags_tasks(*,Tags(*)))")
            .gte("tasks.date", today)
            .lte("tasks.date", next7)
            .eq("tasks.Deleted", false)
            .eq("User_id", user?.id));
        }

        else if (filter === "Completed") {
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*,tags_tasks(*,Tags(*)))")
            .eq("tasks.Completed", true)
            .eq("tasks.Deleted", false)
            .eq("User_id", user?.id));
        }

        else if (filter === "Deleted") {
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*,tags_tasks(*,Tags(*)))")
            .eq("tasks.Deleted", true)
            .eq("User_id", user?.id));
        }

        else {
          
          ({ data, error } = await supabase
            .from("Users_Tasks")
            .select("tasks(*,tags_tasks(*,Tags(*)))")
            .eq("User_id", user?.id));
        }
      }
      if(isTag !== null && TagId !== 0){
        ({ data, error } = await supabase
          .from("tags_tasks")
          .select("tasks(*,tags_tasks(*,Tags(*)))")
          .eq("tasks.Deleted", false)
          .eq("id_tag", TagId)
          .eq("user_id", user?.id)
          .order("id_task", { ascending: true })
        );
        console.log(data);
      }
      
      


      if (error) {
        console.error("Supabase error:", error.message);
        setTasks([]);
      } else {
       console.log("RAW fetched data:", data);
       const extracted = (data ?? [])
  .map((row: any) => row.tasks)
  .filter(Boolean)
  .map((t: any) => ({
    ...t,
    // OSTAVLJAMO ISTO IME koje Task komponenta koristi
    tags_tasks: (t.tags_tasks ?? []).filter(
      (jt: any) => jt.Tags != null
    ),
  }));
        setTasks(extracted);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setTasks([]);
    }
 
    setLoading(false);
  };

  
  useEffect(() => {
    fetchData();
    
    const subscription = supabase
      .channel("custom-all-channel")
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "tasks" },
        (payload) => {
          setTasks((prev) =>
            prev.map((t) =>
             t.id === payload.new.id ? { ...t, ...payload.new } : t
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
    
  }, [filter, isCategory, category_id,TagId,isTag]);

  return {
    tasks,
    loading,
    refresh: fetchData,
  };
}
