import jwt from 'jsonwebtoken';




const handleUpload = async (videoUrl: string, token: string) => {
    console.log("token in handle upload" , token);
    if (videoUrl) {
      const blob = await fetch(videoUrl).then((res) => res.blob());
      const file = new File([blob], "video.mp4"); // Create a File object from the Blob
  
      const formData = new FormData();
      formData.append("video", file);
  
      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          headers: {
            "Authorization": token,
          },
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
  
          console.log("Secure URL:", data.url);
          return data.url;
        } else {
          console.error("Error uploading video:", response.status);
          throw new Error("Error uploading video");
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
      }
    }
  };
  
  

export const saveVideo = async (videoUrl : string , token : string) => {
    console.log("token in SAVING VIDEO FUNC" , token);
    const decodedToken = jwt.decode(token);
    const username = decodedToken;
    let title = "VIDEO 1"
    if (videoUrl){
       const secureUrl = await handleUpload(videoUrl,token) ;
       if(secureUrl){
            const response = await fetch('http://localhost:8000/user',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username , url : secureUrl , title })
              });

              if(response){
                console.log(response);
                return response
              }
            console.log("Error saving data")
       }
    }
}

