let addToy = false;
// const button = document.createElement('button')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    
  });
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then((data) => renderAllToys(data))

  
  
});

function renderAllToys(toysArray) {
  toysArray.forEach((toyObject) => {
    renderNewToy(toyObject);
  })};

function renderNewToy(toy) {
  const newDiv = document.createElement('div')
  newDiv.classList.add('card')
  const newH2 = document.createElement("h2")
  newH2.textContent = toy.name
  const newImg = document.createElement("img")
  newImg.src = toy.image
  const newPTag = document.createElement("p")
  newPTag.classList.add('likes')
  const likeBtn = document.createElement('button')
  newPTag.textContent = toy.likes
  likeBtn.classList.add('like-btn')
  likeBtn.textContent = "Like"
  
  newImg.classList.add('toy-avatar')

  const toyDiv = document.querySelector('#toy-collection')

  newDiv.append(newH2, newImg, newPTag, likeBtn)
  toyDiv.append(newDiv)
}

const button = document.querySelector('button')

button.addEventListener("click", function(event) {
  event.preventDefault();
  
    const likes = document.querySelector('p.likes')
    const likeNum = parseInt(likes.innerText) + 1;
   

    // likes.textContent = `${likeNum} Likes`

    // const id = event.target.dataset.id;
    // console.log('id')

    fetch("localhost:3000/toys/:id", {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        "likes": likeNum
    }),
  })
  .then((res) => res.json())
  .then((likedPost) => {
    console.log(likedPost)
    likes.textContent = `${likeNum} Likes`;
  })
})

newToyForm = document.querySelector(".add-toy-form")

newToyForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const newToyObj = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
  };
  
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyObj)
  })
  .then((response) => response.json())
  .then((data) => renderNewToy(data))
})







