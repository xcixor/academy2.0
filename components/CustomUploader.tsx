"use client";

import { useState } from "react";

type Props = {};

const CustomUploader = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      // Check if file size exceeds 500KB
      if (selectedFile.size > 500 * 1024) {
        alert("File size should not exceed 500KB.");
        return; // Prevent setting the file and exit the function
      }
      setFile(selectedFile);
    }
  };

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
          // Optionally, reset the file state or perform additional actions on success
        } else if (xhr.readyState === 4 && xhr.status != 200) {
          console.log("errred", xhr.status, xhr.responseText);
        }
      });
      xhr.send(file);
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