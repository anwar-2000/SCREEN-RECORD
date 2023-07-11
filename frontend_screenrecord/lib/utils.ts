import jwt from 'jsonwebtoken';

const handleUpload = async (videoUrl : string, token : string) => {
  console.log("UPLOADING " , videoUrl , token)
  try {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    console.log("UPLOADING BLOB " , blob) 
  
    const uploadResponse = await fetch('http://localhost:8000/upload', {
       method: 'POST',
       headers: {
       'Authorization': token,
       'Content-Type': blob.type,
              },
       body: blob,
});

    if (uploadResponse.ok) {
      const result = await uploadResponse.json();
      const cloudinaryUrl = result.url;

      console.log('Video uploaded to Cloudinary:', cloudinaryUrl);
      return cloudinaryUrl;
    } else {
      console.error('Error uploading video to Cloudinary:', uploadResponse.status);
      throw new Error('Error uploading video to Cloudinary');
    }
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw error;
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

