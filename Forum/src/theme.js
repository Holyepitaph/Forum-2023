 export const ForumTheme = {
    MainForum:{
        main:"w-full text-textA dark:text-text bg-backA dark:bg-back mt-4 p-4",
        cardMain:"bg-cardA dark:bg-card my-4 grid grid-cols-12 justify-center rounded-xl dark:rounded-none md:px-2 md:py-4 ",
        image:"col-span-12 h-12 justify-self-center sm:col-span-2 sm:ml-4 sm:h-24 bg-closeA dark:bg-text ml-2 my-2 border border-white md:h-36 md:w-36",
        linkMain:"w-full h-full col-span-11 sm:col-span-9 mt-2 pb-4 flex flex-col justify-between md:text-2xl",
        linkAlt:'flex justify-between px-4 sm:ml-4',
        linkButton:"dark:text-black h-4 w-4 mt-2 mr-2 p-1 text-[.7rem] bg-closeA dark:bg-text dark:rounded-none leading-[.1rem] md:mt-4 md:text-xl md:py-4 md:leading-[0rem] md:pl-2 md:pr-5",
        hidden:"hidden sm:inline"
    },
    InputForum:{
        main:"w-full bg-backA text-textA dark:text-text dark:bg-back py-4 px-4 flex flex-col gap-4 md:text-2xl",
        formMain:"bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-2xl dark:rounded-none",
        form:"flex flex-col sm:flex-row justify-between gap-2",
        externalButtons:"flex justify-between gap-4"
    },
    AdminForum:{
        buttonMain:"w-full bg-backA dark:bg-back p-2 md:text-2xl md:p-4",
        button:"bg-cardAltA dark:bg-cardAlt px-4 py-2 dark:rounded-none text-textA dark:text-text md:px-6 md:py-4 md:font-semibold" 
    }
 }

 export const ForumPostTheme = {
    MainForumPost:{
        main:"bg-backA dark:bg-back mt-4 p-4 flex flex-col gap-4 md:text-2xl",
        cardMain:"flex bg-cardA dark:bg-card justify-end py-4 gap-2 rounded-xl dark:rounded-none",
        linkMain:"w-full flex flex-col text-textA dark:text-text gap-2 min-w-0 px-2",
        linkText:"flex gap-2 text-sm justify-between px-4 md:text-xl",
        linkButton:"dark:text-black h-4 mt-2 mr-2 p-1 text-[.7rem] bg-closeA dark:bg-text dark:rounded-none leading-[.1rem]",
        hidden:"hidden sm:inline"
    },
    InputPost:{
        main:"mt-4 bg-backA dark:bg-back p-2 text-textA dark:text-text",
        formMain:"bg-cardAltA dark:bg-cardAlt p-4 mx-2 rounded-2xl dark:rounded-none",
        form:"flex flex-col sm:flex-row gap-2 md:text-xl",
        externalButtons:"flex justify-between px-2 py-4 gap-4"
    },
    AdminForumPosts:{
        buttonMain:"w-full bg-backA dark:bg-back p-2 mt-4",
        button:"bg-cardAltA dark:bg-cardAlt px-4 py-2 dark:rounded-none text-textA dark:text-text md:text-2xl" 
    }
 }

 export const PostTheme = {
    SubComment:{
        buttonHidden:"dark:text-black h-4 my-2 mr-2 p-1 text-[.7rem] bg-closeA dark:bg-text dark:rounded-none leading-[.1rem] md:text-lg md:leading-[0rem] md:py-4 md:px-2",
        main:"mx-4 mb-4 flex flex-col gap-4",
        cardMain:"bg-cardAltA dark:bg-cardAlt grid grid-cols-12 justify-between px-4 py-2 rounded-2xl dark:rounded-none",
        image:"col-span-12 justify-self-center  sm:col-span-2 h-24 bg-closeA dark:bg-card",
        cardSub:"col-span-11 sm:col-span-9 w-full flex flex-col justify-between py-2 md:text-xl",
        text:"flex gap-4 text-sm justify-between sm:pl-4 md:text-lg",
        textAlt:"text-sm leading-[1rem] whitespace-nowrap md:leading-[2rem]",
        textAltA:"hidden sm:inline",
        linkButton:"dark:text-black h-4 mt-2 mr-2 p-1 text-[.7rem] bg-closeA dark:bg-text dark:rounded-none leading-[.1rem] md:text-lg md:py-3 md:w-8 md:leading-[0rem]" 
    },
    MainPost:{
        hidden:{
            buttonMain:"bg-backA dark:bg-back",
            button:"bg-cardAltA dark:bg-cardAlt dark:rounded-none my-4 py-1 md:text-2xl md:py-2" 
        },
        main:"mt-4 text-textA dark:text-text",
        mapMain:{
            main:"flex flex-col gap-4",
            mainAlt:"bg-backA dark:bg-back p-6 ",
            card:"bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-2xl dark:rounded-none  min-w-0 px-2 md:text-2xl md:gap-8",
            text:"flex justify-between px-6 md:text-xl",
            textAlt:"hidden sm:inline"
        },
        comment:{
            main:"bg-backA dark:bg-back p-6 flex flex-col gap-4 ",
            mainAlt:"bg-cardA dark:bg-card rounded-2xl dark:rounded-none ",
            card:"grid grid-cols-12 pb-4 px-4  min-w-0 px-2",
            image:"col-span-12 justify-self-center sm:col-span-2 h-24 bg-closeA dark:bg-cardAlt",
            textMain:"col-span-11 sm:col-span-9 flex flex-col justify-between w-full py-2 md:text-2xl",
            textAlt:"flex justify-between w-full px-4 gap-2 md:text-xl",
            textAltA:"text-sm leading-[1.6rem] sm:text-md",
            textAltB: 'hidden sm:inline',
            linkButton:"dark:text-black h-4 mt-2 mr-2 p-1 text-[.7rem] bg-closeA dark:bg-text dark:rounded-none leading-[.1rem] md:text-lg md:py-3 md:w-8 md:leading-[0rem]"
        }
    },
    InputComment:{
        main:"bg-backA dark:bg-back p-4 flex flex-col gap-4",
        mainAlt:"bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-xl dark:rounded-none md:text-xl",
        inputAlt:"flex flex-col sm:flex-row gap-4",
        input:"flex gap-4",
        externalButtons:"flex gap-4"
    },
    InputSubComment:{
        main:"mx-4",
        form:"bg-cardAltA dark:bg-cardAlt p-4 flex flex-col gap-4 rounded-xl dark:rounded-none md:text-xl",
        inputAlt:"flex flex-col sm:flex-row gap-4",
        input:"flex gap-4",
        externalButtons:"flex gap-2 py-4"
    }
 }

 export const UserListTheme = {
    main:"bg-backA dark:bg-back mt-4 grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 text-textA dark:text-text",
    link:"bg-cardA dark:bg-card grid-cols-3 grid p-2 grid-1 text-left gap-2 sm:text-sm md:text-lg md:pb-4 lg:grid-cols-2",
    line: "col-span-3 border border-cardAltA dark:border-cardAlt md:border-2",
    text:"text-sm leading-loose md:text-lg md:leading-[2.3rem]",
    textAlt:"sm:leading-loose"
 }

 export const SingleUserListTheme = {
    InputMessage:{
        main:"bg-backA dark:bg-back mt-4 grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 text-textA dark:text-text",
        formMain:"bg-cardAltA dark:bg-cardAlt col-span-1 sm:col-span-2 p-4 mx-2 rounded-2xl dark:rounded-none",
        form:"flex flex-col sm:flex-row gap-2",
        button:"bg-cardA dark:bg-card px-4 py-2 mt-4 dark:rounded-none text-textA dark:text-text w-1/2 mx-auto" 

    },
    RelationshipLogic:{
        main:"bg-backA dark:bg-back mt-4 p-4 gap-4 text-textA dark:text-text flex",
        button:"bg-cardAltA dark:bg-cardAlt px-4 py-2 dark:rounded-none text-textA dark:text-text w-1/2 mx-auto" 
    },
    AdminUserSingle:{
        main:"bg-backA dark:bg-back mt-4 grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 text-textA dark:text-text",
        line: "col-span-3 border border-cardAltA dark:border-cardAlt",
        card:"bg-cardA dark:bg-card py-4 grid grid-cols-2 gap-1 px-4 text-left rounded-2xl dark:rounded-none  place-content-start",
        cardAlt:"bg-cardA dark:bg-card py-4 grid grid-cols-1 gap-3 px-4 text-left rounded-2xl dark:rounded-none",
        cardAltA:"bg-cardAltA dark:bg-cardAlt ml-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-l-2xl dark:rounded-none"
    },
    Friend:"bg-cardAltA dark:bg-cardAlt mx-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-l-2xl dark:rounded-none"
 }

 export const MessageSingleTheme = {
    InputMessage:{
        main:"bg-backA dark:bg-back mt-4 text-textA dark:text-text md:text-2xl",
        form:"flex gap-4 p-4",
        input:"w-full bg-mainA dark:bg-text pl-4 dark:text-black",
        button:"bg-cardA dark:bg-card dark:rounded-none py-[.05rem]"
    },
    MessageSingle:{
        main:"bg-backA dark:bg-back mt-4 p-4 flex flex-col gap-4 text-textA dark:text-text md:text-xl",
        title:"bg-cardA dark:bg-card mx-2 p-2 md:text-2xl md:py-3",
        self:{
            main:"grid grid-cols-4 mx-2",
            space:"sm:col-span-2" ,
            card:"col-span-3 sm:col-span-2 bg-cardA dark:bg-card  rounded-tr-[2rem] rounded-bl-[2rem]" ,
            text:"bg-mainA dark:bg-text text-black rounded-tr-[2rem] rounded-bl-[.5rem] p-1 m-2 md:p-3" ,
            info:"flex gap-4 justify-between pl-6 pr-2 text-[.7rem]" 
        },
        other:{
            main:"grid grid-cols-4 mx-2" ,
            card:"col-span-3 sm:col-span-2 bg-cardA dark:bg-card  rounded-tl-[2rem] rounded-br-[2rem]" ,
            text:"bg-mainA dark:bg-text text-black rounded-tl-[2rem] rounded-br-[.5rem] p-1 m-2 md:p-3" ,
            info:"flex gap-4 justify-between pl-2 pr-6 text-[.6rem]"
        }
    }
 }

//For Host on Admin and Main for User
 export const HostTheme = {
    InfoChange:{
        main:"bg-cardAltA dark:bg-cardAlt flex flex-col gap-4 py-4 px-4",
        form:"flex flex-col sm:flex-row justify-between gap-2",
        text:"sm:w-1/2",
        externalButtons:"flex justify-between gap-4 pt-4"
    },
    line:"border border-cardA dark:border-card w-full col-span-2",
    lineAlt:"border border-cardAltA dark:border-cardAlt w-full col-span-2 place-self-end",
    BlockList:"bg-cardAltA dark:bg-cardAlt mb-2 mx-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-2xl dark:rounded-none",
    FriendList:"bg-cardAltA dark:bg-cardAlt mb-2 mx-4 py-4 px-2 grid grid-cols-2 text-left gap-1 rounded-l-2xl dark:rounded-none",
    Host:{
        main:"text-textA dark:text-text",
        button:{
            main:"bg-backA dark:bg-back mt-4",
            button:"bg-cardAltA dark:bg-cardAlt m-4 rounded-xl dark:rounded-none p-2"
        },
        mainCard:"bg-backA dark:bg-back mt-4",
        mainCardAlt:"grid grid-cols-1 sm:grid-cols-2 gap-4 p-4",
        infoCard:"bg-cardA dark:bg-card py-4 grid grid-cols-2 gap-1 px-4 text-left rounded-2xl dark:rounded-none place-content-start",
        forumCard:"bg-cardA dark:bg-card flex flex-col  rounded-2xl dark:rounded-none",
        forumCardLink:"bg-cardAltA dark:bg-cardAlt mx-4 my-4 pt-6 rounded-l-2xl dark:rounded-none",
        friendsList:"bg-cardA dark:bg-card flex flex-col py-4  rounded-2xl dark:rounded-none",
        blockList:"bg-cardA dark:bg-card flex flex-col py-4 rounded-2xl dark:rounded-none"
    }
 }

 export const InputTheme = {
    main:"bg-mainA dark:bg-main w-full pl-4",
    mainAlt:"bg-mainA dark:bg-main w-full pl-4",
    alt:"flex flex-col sm:flex-row gap-2 px-4",
    fileMain:"flex justify-between",
    file:"bg-mainA dark:bg-main w-full",
    button:{
        cancel:"bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem] md:p-6 md:text-2xl md:leading-[.1rem]",
        cancelAlt:"bg-cardAltA px-0 dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem] md:text-2xl md:leading-[.1rem] md:py-5",
        submit:"bg-cardAltA dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem] md:p-6 md:text-2xl md:leading-[.1rem]",
        submitAlt:"bg-cardAltA px-0 dark:bg-cardAlt w-full dark:rounded-none h-8 leading-[.5rem] md:text-2xl md:leading-[.1rem] md:py-5"
    }
 }

 export const MenuTheme = {
    main:"w-full bg-backA dark:bg-back text-textA dark:text-text py-2 px-4 flex justify-between sm:justify-center sm:gap-8 gap-2 md:py-6 md:text-2xl",
    link:"bg-cardAltA dark:bg-cardAlt p-1 rounded-md dark:rounded-none sm:px-4 md:px-3 md:py-2",
    linkAlt:"bg-cardAltA dark:bg-cardAlt p-1 text-[1.5vw]  rounded-3xl dark:rounded-none",
    linkAltB:"bg-cardAltA dark:bg-cardAlt p-1 dark:rounded-none rounded-md dark:rounded-none md:px-3 md:py-2"
 }

 export const SignUpTheme = {
    main:'w-full bg-backA dark:bg-back p-4 text-textA dark:text-text',
    card:'bg-cardA dark:bg-card flex flex-col justify-between gap-4 p-2 whitespace-nowrap',
    button:'bg-cardAltA dark:bg-cardAlt',
    text:'w-1/3 text-left'
 }

 export const LoginMenuTheme ={
    main:"flex gap-4 justify-between p-4 bg-backA dark:bg-back text-textA dark:text-text md:text-xl md:justify-center md:gap-8",
    link:"bg-backA dark:bg-back p-2 bg-cardA dark:bg-card"
 }