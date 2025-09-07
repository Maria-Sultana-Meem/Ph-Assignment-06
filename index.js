const allCategory = document.getElementById('all-categories')
const plantsCardContainer = document.getElementById('plants-card-container')


// load category......
const loadCategory=()=>{
  const url =('https://openapi.programming-hero.com/api/categories')
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{
   displayCategory(data.categories);
   
  })
  .catch((err)=>{
    console.log(err);
    
  })
};
// display category.....
const displayCategory=(categories)=>{
    allCategory.innerHTML=''
  categories.forEach((category)=>{

     allCategory.innerHTML+=`
       <li id="${category.id}" class=" p-2 rounded-lg hover:text-white hover:bg-green-700  cursor-pointer">${category.category_name}</li>
     
     `

  })
  allCategory.addEventListener('click',(e)=>{
    
   const allLi=document.querySelectorAll('li')
   allLi.forEach((li)=>{
    li.classList.remove('bg-green-700')
     
   })
   if (e.target.localName==='li') {
   
    e.target.classList.add('bg-green-700')
    
    loadPlantsByCategory(e.target.id)
}


  })
  
};



const loadPlantsByCategory=(plantsId)=>{
const url = `https://openapi.programming-hero.com/api/category/${plantsId}`
fetch(url)
.then((res)=>res.json())
.then((data)=>{

  displayPlantsByCategory(data.plants)
  
})
.catch((err)=>{
  console.log(err);
  
})

}
const displayPlantsByCategory=(plants)=>{
  // console.log(plants);
  plantsCardContainer.innerHTML=""
  
  plants.forEach((plant)=>{

   plantsCardContainer.innerHTML+=`
   
    <div class="border border-gray-100 rounded-lg p-4 bg-white space-y-4">
            <div class=" h-[200px]">
            <img class="w-full h-full rounded-lg" src="${plant.image}" alt="">
            </div>
            <h1 class="font-bold text-xl">${plant.name}</h1>
            <p>${plant.description}</p>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl">${plant.category}</button>
              <h2><span>৳</span>${plant.price}</h2>
            </div>
            <button class="btn bg-green-700 w-full rounded-2xl text-white">Add to Cart</button>
          </div>
   
   
   
   
   
  `

   })
   


}




loadCategory()
loadPlantsByCategory(1)