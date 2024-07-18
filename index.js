
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".inner")[0].scrollIntoView({behavior : 'smooth' , block : 'center' ,inline :'center'});
    setTimeout(()=>{
        document.querySelector(".sub").style.animation = "zoom 3s ease forwards";
    },2000);
});
const videos = document.querySelectorAll('.inner');
let currentIndex = 0;
let isScrollingAllowed = true;
let scrollTimeout = null;
let nextscrolldeltavalue = 300;
let previousdelatavalue = 0;
let scrollDirection = true;
let deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
const scrollToVideo = (index) => {
    if (index >= 0 && index < videos.length) {
        videos[index].scrollIntoView({ behavior: 'smooth' });
    }
};
const handleWheel = (event) => {
    if (isScrollingAllowed) {
        if (event.deltaY > 0) {
            currentIndex = Math.min(currentIndex + 1, videos.length - 1);
            scrollToVideo(currentIndex);
            console.log(deltacount);
            pauseScrolling();
        } else if (event.deltaY < 0) {
            currentIndex = Math.max(currentIndex - 1, 0);
            scrollToVideo(currentIndex);
            console.log(deltacount);
            pauseScrolling();
        }
    }
    else {
        if (event.deltaY > 0) {
            if(scrollDirection){
                scrollDirection = false;
                deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
            }
            if(deltacount==nextscrolldeltavalue) {
                // nextscrolldeltavalue+=100;
                // previousdelatavalue+=100;
                deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
                isScrollingAllowed = true;
            }
            deltacount=(currentIndex == 8) ? deltacount=150  : deltacount+1; 
        } 
        else if (event.deltaY < 0) {
            if(!scrollDirection){
                scrollDirection = true;
                deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
            }
            if(deltacount==previousdelatavalue) {
                // nextscrolldeltavalue-=100;
                // previousdelatavalue-=100;
                deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
                isScrollingAllowed = true;
            }
            deltacount=(currentIndex == 0) ? deltacount=150  : deltacount-1; 
        }
    }
    if (scrollTimeout) {
        event.stopPropagation();
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        isScrollingAllowed = true;
        // let currentvalue=currentIndex;
        // nextscrolldeltavalue = ((currentvalue+1)*100)+300; 
        // previousdelatavalue = currentvalue*100;
        // deltacount = (nextscrolldeltavalue + previousdelatavalue ) / 2;
        deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
    }, 250);
};
const pauseScrolling = () => {
    isScrollingAllowed = false;
};
document.addEventListener('wheel', handleWheel,{passive : false});