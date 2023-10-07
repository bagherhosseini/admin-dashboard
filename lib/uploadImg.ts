import * as cloudinary from 'cloudinary';

export async function uploadImg(img: string,  name: string){
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1; // Months are zero-based, so we add 1.
    const day: number = currentDate.getDate();
    const hour: number = currentDate.getHours();
    const minute: number = currentDate.getMinutes();
    const second: number = currentDate.getSeconds();
    const millisecond: number = currentDate.getMilliseconds();
    const time : string = `${year}${month}${day}${hour}${minute}${second}${millisecond}`;

    const min = 100000000000000000;
    const max = 1000000000000000000;
    const firstNumber: number = Math.random() * (max - min) + min;
    
    const imgName = `${firstNumber}${time}+${name}`;

    cloudinary.v2.config({ 
        cloud_name: 'dqmdraaxc', 
        api_key: '328737299377439', 
        api_secret: 'E2cU_RfddX4yP5g_w6nFzAPWlno' 
    });
    
    
    const url = await cloudinary.v2.uploader.upload(img,
        { public_id: imgName },
        function(error: any, result: any) {
            return result.url;
        }
    );
    
    return url;
}