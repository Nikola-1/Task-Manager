import { supabase } from "@/app/Connection/Supabaseclient";
import { useEffect, useState } from "react";



interface TaskCategoryImageProps{
               
                id:number
}
export default function TaskCategoryImage({id}:TaskCategoryImageProps){
           const [imageUrl,setImageUrl] = useState<string | null>(null);
            useEffect(()=>{
                async function  getImage(){
                   
                const {data,error} = await supabase.from("Categories").select("image").eq('id',id).single();

                if(!error && data){
                    setImageUrl(data.image)
                }
                else{
                    return;
                }
                
            }
            getImage();
            },[id])
           
    return(
      
        <>
   
        { imageUrl ? <img  src={"../img/"+imageUrl+".png"} height={20} width={20}></img> : <></>}
        </>
    )

}