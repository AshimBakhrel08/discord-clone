// "use client"

// import { UploadDropzone } from "@/lib/uploadthing";
// import "@uploadthing/react/styles.css"
// import { FileIcon, X } from "lucide-react"
// import Image from "next/image";

// interface FileUploadProps {
//   onChange: (url?: string,type?: string) => void;
//   value: string;
//   endpoint: "messageFile" | "serverImage"
// }

// export const FileUpload = ({
//   onChange,
//   value,
//   endpoint
// }: FileUploadProps) => {
//   // const fileType = value?.split(".").pop();
//   const fileType = value ? value.split(".").pop()?.toLowerCase() : "";

//   if (value && fileType !== "pdf") {
//     return (
//       <div className="relative h-20 w-20">
//         <Image
//           unoptimized
//           fill
//           src={value}
//           alt="upload"
//           className="rounded-full"
//         />
//         <button onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     )
//   }

//   if (value && fileType === "pdf") {
//     return (
//       <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
//         <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
//         <a
//           href={value}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
//         >
//           {value}
//         </a>
//         <button onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm">
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     )
//   }
//   return (
//     <UploadDropzone
//       className="cursor-pointer"
//       endpoint={endpoint}
//       appearance={{
//         button: (props) => ({
//           cursor: 'pointer',
//         }),
//       }}
//       onClientUploadComplete={(res) => {
//         onChange(res?.[0].url);
//       }}
//       onUploadError={(error: Error) => {
//         console.log(error);
//       }}
//     />

//   );

// }




"use-client"

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"
import { FileIcon, X } from "lucide-react"
import Image from "next/image";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url?: string ,type?:string)=> void;
  value: string;
  endpoint:"messageFile" | "serverImage"
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
}:FileUploadProps) => {
   let [fileType ,setFileType ] = useState("");

  if(value && fileType !== "application/pdf"){
    return (
      <div className="relative h-20 w-20">
        <Image
          unoptimized
          fill
          src={value}
          alt="upload"
          className="rounded-full"
        />
        <button onClick={()=>onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
          <X className="h-4 w-4"/>
        </button>
      </div>
    )
  }

  if(value && fileType === "application/pdf"){
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
        <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm
        text-indigo-400 hover:underline">
          <span>
      {value.length > 50 ? `${value.slice(0, 50)}...` : value}
       </span>
        </a>
        <button onClick={()=>onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm">
          <X className="h-4 w-4"/>
        </button>
      </div>
    )
  }
  
  return (
    <UploadDropzone
  className="cursor-pointer"
  endpoint={endpoint}
  appearance={{
    button: (props) => ({
      cursor: 'pointer',
    }),
  }}
  onClientUploadComplete={(res) => {
    console.log("Upload complete! Response:", res);

    if (!res || res.length === 0) {
        console.log("No file uploaded or response is empty.");
        return;
    }
    onChange(res[0].url,res[0].type);
    setFileType(res[0].type)
}}

  onUploadError={(error: Error) => {
    console.log(error);
  }}
/>

  );
  
}