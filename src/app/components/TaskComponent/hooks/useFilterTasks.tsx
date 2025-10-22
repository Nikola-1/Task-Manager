/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/app/connection/supabaseclient";
import { useEffect, useState } from "react";
//import { FilterType } from "../Types/FilterType";

export default function useFilterTasks(filter: string,isCategory:boolean | null,category_id:number) {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        let table = "tasks";
         let data, error;
        if(isCategory == null && category_id ==0){

        
        if (filter === "Completed") table = "tasks";
        else if (filter === "Deleted") table = "tasks";
           
        try {
          
            if (filter === "Today") {
                ({ data, error } = await supabase
                    .from("tasks")
                    .select("*")
                    .eq("date", new Date().toISOString().split("T")[0]).eq("Completed",false).eq("Deleted",false));
            } else if (filter === "7Days") {
                const date = new Date();
        
                ({ data, error } = await supabase
                    .from("tasks")
                    .select("*").gte("date",new Date().toISOString().split("T")[0])
                    .lte("date", new Date(date.setDate(date.getDate()+7)).toISOString().split("T")[0]).eq("Completed",false).eq("Deleted",false));
            }
            else if(filter === "Completed"){
                 ({ data, error } = await supabase.from(table).select("*").eq("Completed",true).eq("Deleted",false));
            }
             else if(filter === "Deleted"){
                 ({ data, error } = await supabase.from(table).select("*").eq("Deleted",true));
            }
             else {
                ({ data, error } = await supabase.from(table).select("*").eq("Completed",false));
            }

            
        } catch (err) {
            console.error("Unexpected error", err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
        }
        else{
           
            ({ data, error } = await supabase
                    .from("tasks")
                    .select("*")
                    .eq("category_id", category_id).eq("Completed","FALSE").eq("Deleted","FALSE"));
        }
        if (error) {
                console.error("Supabase error", error.message);
                setTasks([]);
            } else {
                setTasks(data || []);
            }
    };

    useEffect(() => {
    
        fetchData();
        // Pretplata na UPDATE događaje
    const subscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'tasks',
        },
        (payload) => {
          
          setTasks((prevItems) =>
            prevItems.map((item) =>
              item.id === payload.new.id ? payload.new : item
            )
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
    }, [filter,isCategory,category_id]);

    return {
        tasks,
        loading,
        refresh: fetchData  
    };
}