let height=(window.innerHeight*6)/9;
let change_top_height = 0;
let change_bottom_height = height;
let slide_name_forward = ["one","two","three","four","five","six","seven","eight","nine"];
let slide_name_backward = ["rev-one","rev-two","rev-three","rev-four","rev-five","rev-six","rev-seven","rev-eight","rev-nine"];
let position = 0;
window.addEventListener('scroll', function(e) {
    if(this.window.scrollY > change_bottom_height){
        position++;
        document.querySelector(".main-two").classList.add(slide_name_forward[position]);
        remove_reverse_name();
        change_top_height+=height;
        change_bottom_height+=height;
        console.log(change_bottom_height+"    "+change_top_height+"     "+position);
    }
    if(this.window.scrollY < change_top_height){
        document.querySelector(".main-two").classList.remove(slide_name_forward[position]);
        remove_reverse_name();
        position--;
        document.querySelector(".main-two").classList.add(slide_name_backward[position]);
        change_top_height-=height;
        change_bottom_height-=height;
        console.log(change_bottom_height+"    "+change_top_height+"     "+position);
    }
});

function remove_reverse_name(){
    slide_name_backward.forEach((element) => {
        document.querySelector(".main-two").classList.remove(element);
    });
}