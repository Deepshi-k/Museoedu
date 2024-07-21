
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll(".inner")[0].scrollIntoView({behavior : 'smooth' , block : 'center' ,inline :'center'});
    setTimeout(()=>{
        document.querySelector(".sub").classList.add("zoomin");
        document.addEventListener('wheel', handleWheel,{passive : false});
    },2000);
});
const inner = document.querySelectorAll('.inner');
let currentIndex = 0;
let isScrollingAllowed = true;
let scrollTimeout = null;
let nextscrolldeltavalue = 300;
let previousdelatavalue = 0;
let scrollDirection = true;
let deltacount = (nextscrolldeltavalue + previousdelatavalue )/2;
let pointer_postion_names = ["pointer-one","pointer-two","pointer-three","pointer-four","pointer-five","pointer-six","pointer-seven","pointer-eight","pointer-nine"];
let pointer = document.querySelector("#pointer");
let sub_container_zoom = false;
function scrollToSlide(index){
    if(sub_container_zoom){
        document.querySelector(".sub").classList.remove("zoomout");
        document.addEventListener('wheel', handleWheel,{passive : false});
        sub_container_zoom = false;
    }
    if (index >= 0 && index < inner.length) {
        inner[index].scrollIntoView({ behavior: 'smooth' });
        pointer.classList = pointer_postion_names[index];
        currentIndex=index;
        console.log(".............");
    }
};

function scrollToSlide_reset(){
    inner[0].scrollIntoView();
    pointer.classList = pointer_postion_names[0];
}
const handleWheel = (event) => {
    if (isScrollingAllowed) {
        if (event.deltaY > 0) {
            currentIndex = Math.min(currentIndex + 1, inner.length - 1);
            scrollToSlide(currentIndex);
            console.log(deltacount);
            pauseScrolling();
        } else if (event.deltaY < 0) {
            currentIndex = Math.max(currentIndex - 1, 0);
            scrollToSlide(currentIndex);
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

document.querySelector(".zoomOut").addEventListener("click",()=>{
    if(!sub_container_zoom) {
        document.querySelector(".zoomOut").classList.add("active");
        document.querySelector(".zoomIn").classList.remove("active");
        document.querySelector(".sub").classList.remove("zoomin");
        document.querySelector(".sub").classList.add("zoomout");
        scrollToSlide_reset(); 
        document.removeEventListener('wheel', handleWheel,{passive : false});
        sub_container_zoom=true;
    }
});

document.querySelector(".zoomIn").addEventListener("click",()=>{
    if(sub_container_zoom) {
        document.querySelector(".zoomIn").classList.add("active");
        document.querySelector(".zoomOut").classList.remove("active");
        document.querySelector(".sub").classList.remove("zoomout");
        document.querySelector(".sub").classList.add("zoomin");
        document.addEventListener('wheel', handleWheel,{passive : false});
        sub_container_zoom=false;
    }
});
