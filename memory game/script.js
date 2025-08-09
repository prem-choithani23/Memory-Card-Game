import { give_images } from './images.js'

//varaibles --init--
let images = give_images()
const PAIRS = 10
const IMAGES = PAIRS * 2
let container = document.getElementsByClassName("container")[0]
let i, j;
let image_tag_array = []
let location = []
let done = []
let tries = 0
let pairs_completed = 0
let COUNTER = 0
let clicked = []
let clicked_image = []

//function for choosing one element from set of image indices
function chooseOne(set) {
    let n;
    n = set.size
    let rand = Math.floor(Math.random() * n)
    let array = Array.from(set)
    return Number.parseInt(array[rand])
}

for (i = 0; i < IMAGES; i++) 
{
    console.log('click detected ')
    let div = document.createElement('div')
    let image = document.createElement('img')
    div.appendChild(image)
    image.className = "images"
    image.setAttribute('id', `${i}`)
    image_tag_array.push(image)
    image.hidden = true

    div.addEventListener('click', () => {

        let x = Number.parseInt(image.id)
        if (done.includes(x))
            return
        COUNTER++
        console.log(COUNTER)
        let src = image_tag_array[x].src
        //index of the card clicked and src of imag of that card pushed in 2 separate arrays
        clicked.push(x)
        clicked_image.push(src)

        if (COUNTER == 2) {
            let popped = clicked_image.pop()
            let index = clicked.pop()

            if (clicked_image.includes(popped)) {
                done.push(index)
                done.push(clicked.pop())
                clicked_image.pop()
                pairs_completed++

            } else {
                setTimeout(() => {
                    image_tag_array[index].hidden = 'true'
                    clicked_image.pop()
                    image_tag_array[clicked.pop()].hidden = 'true'
                }, 1000)

            }
            COUNTER = 0
            tries++
        }
        else if (COUNTER != 1) {
            COUNTER = 0
        }
        if (image.hidden == false)
            image.hidden = true
        else if (image.hidden == true)
            image.hidden = false;

        if (pairs_completed == PAIRS) {
            console.log('YOU WIN')
        }
    })
    div.className = "card"
    container.appendChild(div)
}

//choosing image index number for PAIR/2 images
let set = new Set()
let num = images.length

for (i = 0; i < num; i++) {
    set.add(i)
}

for (i = 0; i < PAIRS; i++) {
    let rand = chooseOne(set)
    location.push(rand)
    set.delete(rand)
}

//allocating an image on 2 random cards
i = 0
let n = image_tag_array.length
let big = new Set()
for (i = 0; i < n; i++) {
    big.add(i)
}

for (i = 0; i < PAIRS; i++) {
    let curr_image = images[location[i]]
    for (j = 0; j < 2; j++) {
        let rand = chooseOne(big)
        image_tag_array[rand].setAttribute('src', curr_image)
        big.delete(rand)
    }
}
