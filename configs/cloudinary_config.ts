import cloudinary from "cloudinary"


cloudinary.v2.config({
    cloud_name: 'YOUR_CLOUD_NAME',
    api_key: 'YOUR_API_KEY',
    api_secret: 'YOUR_API_SECRET'
  });

  export default cloudinary;