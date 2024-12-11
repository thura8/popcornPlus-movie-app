import React,{createContext,useContext,useState} from 'react'

const ImageContext = createContext()
export const useImage = ()=>{
    return useContext(ImageContext)
}

export const ImageProvider = ({children})=>{

    const [profileImage,setProfileImage] = useState(null)

    return(
        <ImageContext.Provider value={{profileImage,setProfileImage}}>
            {children}
        </ImageContext.Provider>
    )
}