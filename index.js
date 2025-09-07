const allCategory = document.getElementById('all-categories')
const plantsCardContainer = document.getElementById('plants-card-container')
const detailsContainer=document.getElementById('details-container')
const cartContainer=document.getElementById('cart-container')
const totalPrice=document.getElementById('total-price')


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


// cards..
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

};

const displayPlantsByCategory=(plants)=>{
  
  plantsCardContainer.innerHTML=""
  
  plants.forEach((plant)=>{

   plantsCardContainer.innerHTML+=`
   
    <div id="${plant.id}" class="border border-gray-100 rounded-lg p-4 bg-white space-y-4">
            <div  class=" h-[200px]"}>
            <img class="w-full h-full rounded-lg" src="${plant.image}" alt="">
            </div>
            <h1 onclick="loadPlantDetails(${plant.id})" class="font-bold text-xl">${plant.name}</h1>
            <p>${plant.description.slice(0,80)}...</p>
            <div class="flex justify-between items-center">
              <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-2xl">${plant.category}</button>
              <h2> <span>৳</span> <span id="price">${plant.price}</span></h2>
              
            </div>
              <button class="btn bg-green-700 w-full rounded-2xl text-white">Add to Cart</button>
          </div>   
  `

   }) 
};

let addTocart =[]

  plantsCardContainer.addEventListener('click',(e)=>{
    
    if (e.target.innerText==="Add to Cart") {
      handleCarts(e)
       
    }

  });
  let total=0;
  const handleCarts=(e)=>{
   const title = e.target.parentNode.children[1].innerText
     const price = e.target.parentNode.children[3].children[1].children[1].innerText
      const id =e.target.parentNode.id
      const priceNum=parseFloat(price)
      addTocart.push({
        title:title,
        price:priceNum,
         id:id
      })

     showCarts(addTocart)
   
      total=priceNum+total;
     document.getElementById('total-price').innerText="৳"+total
    
  };
  const showCarts=(carts)=>{
    cartContainer.innerHTML=""
  carts.forEach((cart)=>{

    cartContainer.innerHTML+=`
    <div class="rounded-lg mt-2 p-2 bg-[#F0FDF4] flex justify-between items-center">
    <div>
    <h1>${cart.title}</h1>
    <p>৳${cart.price}</p>
    </div>
    <div onclick="handleDelete('${cart.id}')" >❌</div>
    </div>
    `
  })

   
  };

 const handleDelete=(deleteId)=>{
   const itemRemove =addTocart.find((cart)=>cart.id ==deleteId)
   if (itemRemove) {
    total=total-itemRemove.price
     document.getElementById('total-price').innerText="৳"+total
   }
  
  const filterdDelete=addTocart.filter((cart)=>cart.id !==deleteId)
   addTocart=filterdDelete
   showCarts(addTocart)

 }

  

const loadPlantDetails=(id)=>{
const url =`https://openapi.programming-hero.com/api/plant/${id}`
fetch(url)
.then((res)=>res.json())
.then((data)=>{
  displayPlantDetails(data.plants)
  
})
};
const displayPlantDetails=(plants)=>{

 detailsContainer.innerHTML=`
      
            <h1 class="font-bold text-xl">${plants.name}</h1>
        <div class="h-[200px]">
            <img class="w-full h-full rounded-lg" src="${plants.image}" alt="">
            </div>
             <h1 class=""><span class="font-bold ">Category:</span>${plants.category}</h1>
              <h2><span class="font-bold ">Price:</span><span>৳</span>${plants.price}</h2>
            <p><span class="font-bold ">Description:</span>${plants.description}</p> 
 `
 document.getElementById('plant_modal').showModal()
}







loadCategory()
loadPlantsByCategory(1)