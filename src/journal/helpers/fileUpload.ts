




export const fileUpload = async(file:File) => {

    const url = 'https://api.cloudinary.com/v1_1/dqzv4dt04/upload';
    const formData = new FormData();

    formData.append('file', file); 
    formData.append('upload_preset', 'react-journal');

    
    try {
        const resp = await fetch(url, 
            { 
                method: 'POST',
                body: formData,
            });


        if(!resp.ok) throw new Error('No se puedo subir imagen');

        const cloudResp = await resp.json();


        return cloudResp.secure_url as string;


    } catch (error:any) {

        console.log(error);

        throw new Error(error.message);
        
    }

}
