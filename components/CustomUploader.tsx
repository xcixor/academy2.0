"use client";

import { useState } from "react";

type Props = {};

const CustomUploader = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  //   const handleUpload = async () => {
  //     // We will fill this out later
  //   };

  const handleUpload = async () => {
    if (file) {
      const contentType = file.type;
      const response = await fetch("/api/gcp", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          contentType: contentType,
          fileName: file.name,
        }),
      });
      const data = await response.json();
      const { url } = data;

      var xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", contentType);

      xhr.addEventListener("readystatechange", function (e) {
        if (xhr.readyState === 4 && xhr.status == 200) {
          console.log("Doneeee");
        } else if (xhr.readyState === 4 && xhr.status != 200) {
          console.log("errred", xhr.status, xhr.responseText);
        }
      });
      var formData = new FormData();
      formData.append("files", file);
      xhr.send(formData);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default CustomUploader;
