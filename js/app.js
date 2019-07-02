//get elements

const itemForm=document.getElementById("itemForm");
const itemInput=document.getElementById("itemInput");
const itemList=document.querySelector(".item-list");
const clearBtn=document.getElementById("clear-list");
const feedback=document.querySelector(".feedback");

//form submission
let itemData=JSON.parse(localStorage.getItem('list')) || [];

if(itemData.length>0){
    itemData.forEach(function(singleItem){
        itemList.insertAdjacentHTML('beforeend',`
        <div class="item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>
    </div>
        `);
        handleItem(singleItem);  //as after loading we are not access the icon so we use this function
    })
}

itemForm.addEventListener("submit",function(event){
    event.preventDefault(); //prevents the page to gets reloaded whenever we press the sumbit

    const textValue=itemInput.value;
    if(textValue===""){
        showfeedback("Please Enter the valid value","danger");
    }
    else{
        //add item
        addItem(textValue);
        //clear form
        itemInput.value="";
        itemData.push(textValue);
        //local storage
        localStorage.setItem('list',JSON.stringify(itemData));

        //add event listeners to icons
        handleItem(textValue);
    }
});

//show feedback

function showfeedback(text,action){
    feedback.classList.add('showItem',`alert-${action}`);
    feedback.innerHTML=`<p>${text}</p>`;
    setTimeout(() => {
        feedback.classList.remove('showItem',`alert-${action}`);

    },3000);
}

//add item
function addItem(value){
    const div=document.createElement('div');
    div.classList.add('item','my-3');
    div.innerHTML=`<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
    itemList.appendChild(div);
}

function handleItem(textValue){
    const items=itemList.querySelectorAll(".item");
    items.forEach(function(item){
        if(item.querySelector(".item-name").textContent===textValue){ //checks the inputed value to the array
            //complete event listener
            item.querySelector('.complete-item').addEventListener('click',function(){
                item.querySelector(".item-name").classList.toggle("completed");
                this.classList.toggle("visibility");  //it fades away when its clicked this refers to specific object
            }) ;
            //edit event listener

            item.querySelector(".edit-item").addEventListener("click",function(){
                itemInput.value=textValue;
                itemList.removeChild(item);  //only removing specific item
                itemData=itemData.filter(function(item){   //it will filter out the edited value
                    return item!== textValue ; // we are just returning the remaining stored value
                });
                localStorage.setItem('list',JSON.stringify(itemData));

            });

            //delete event Listener
            item.querySelector(".delete-item").addEventListener("click",function(){
                itemList.removeChild(item);  //only removing specific item
                itemData=itemData.filter(function(item){   //it will filter out the edited value
                    return item!== textValue ; // we are just returning the remaining stored value 
                });
                localStorage.setItem('list',JSON.stringify(itemData));
                showfeedback("Item deleted", "success");
            })

        }
    })
}

clearBtn.addEventListener("click",function(){
    itemData=[];
    const items=itemList.querySelectorAll(".item");
    if(items.length>0){
        items.forEach(function(item){
            itemList.removeChild(item); //it just removes the all items 
        })
    }
})