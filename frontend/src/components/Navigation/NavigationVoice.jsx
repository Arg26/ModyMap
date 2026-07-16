import { useEffect, useRef } from "react";

export default function NavigationVoice({

    isNavigating,
    routeInfo,

}){

    const previous=useRef("");

    useEffect(()=>{

        if(!isNavigating) return;

        if(!routeInfo?.distance) return;

        const message=

            "Distance remaining " +

            routeInfo.distance +

            ". Estimated time " +

            routeInfo.time;

        if(previous.current===message) return;

        previous.current=message;

        window.speechSynthesis.cancel();

        const speech=new SpeechSynthesisUtterance(message);

        speech.rate=1;

        speech.pitch=1;

        window.speechSynthesis.speak(speech);

    },[routeInfo,isNavigating]);

    return null;

}