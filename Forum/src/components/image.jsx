


export const ImagesViewer = ({info,change}) =>{
    const baseUrl = "../images/"
    const image = baseUrl + info 
    if(info == null){
      return(
        <></>
      )
    }
    return(
      <>
        <img className={change} src={image}/>
      </>
    )
  }

  export const ImagesViewerAlt = ({info,change}) =>{
    const baseUrl = "/images/"
    const image = baseUrl + info 
    if(info == null){
      return(
        <></>
      )
    }
    return(
      <>
        <img className={change} src={image}/>
      </>
    )
  }