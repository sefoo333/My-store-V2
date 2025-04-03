import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dj2rasyos",
  api_key: "682828339745669",
  api_secret: "DC-x3cL47YaHGBJTgsTsXAtCCWA",
  secure:true,
});

export default cloudinary;
