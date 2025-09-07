const allCategory = document.getElementById('all-categories')


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
  
};

const loadPlantsByCategory=(id)=>{
const url = `https://openapi.programming-hero.com/api/category/${id}`
fetch(url)
.then((res)=>res.json())
.then((data)=>{
  console.log(data);
  
})


}
const displayPlantsByCategory=()=>{



}




loadCategory()
loadPlantsByCategory()