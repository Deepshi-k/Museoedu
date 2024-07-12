let height=(window.innerHeight*6)/9;
let change_top_height = 0;
let change_bottom_height = height;
let slide_name_forward = ["one","two","three","four","five","six","seven","eight","nine"];
//let slide_name_backward = ["rev-one","rev-two","rev-three","rev-four","rev-five","rev-six","rev-seven","rev-eight","rev-nine"];
let position = 0;
let current_height = window.scrollY;
window.addEventListener('scroll', function(e) {
    if(this.window.scrollY > change_bottom_height){
        position=(position==8)?position:++position;
        document.querySelector(".main-two").classList.add(slide_name_forward[position]);
        let current_slide=document.querySelector(".main-two").classList.value.split(" ");
        current_slide=current_slide[current_slide.length-1];
        console.log(current_slide);
        console.log(document.querySelector("."+current_slide));
        document.querySelector("."+current_slide).style.animation=`${current_slide} 10s easy`;
        change_top_height+=height;
        change_bottom_height+=height;
    }
    if(this.window.scrollY < change_top_height){
        if(position<1){
            return;
        };
        position=(position==8)?position:--position;
        let current_slide=document.querySelector(".main-two").classList.value.split(" ");
        current_slide=current_slide[current_slide.length-1]
        
        document.querySelector(".main-two").classList.remove(current_slide);
        change_top_height-=height;
        change_bottom_height-=height;
    }
});