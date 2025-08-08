//! ARAYÜZE EKLEME 
//* ilk kısımda sayfadaki tüm elementleri seçme ile başlayalım 

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos")

eventListener();

//* tüm event listenerları fonksiyon içerine ekleyelim 
function eventListener() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos)
}




//* girilen input değeri toDo ya ekleme
function addTodo(e) {
    const newTodo = todoInput.value.trim(); // ınput kısmına girilen değeri alalım , trim methodu ise baştaki ve sondaki gereksiz boşlukları siler.

    // newTodo değeri boş ise kontrolu .
    if (newTodo === "") {
        showAlert("warning","Lütfen Bir Todo Girin") // fonksiyonu ile bir uyarı mesajı döndürelim 
    } else { 
        addTodoToUI(newTodo) // arayüze ekleme işlemi yapalım. fonksiyonuna gönderme işlemi yapalım.
        
        addTodoToStorage(newTodo); // local storage ekleme kısmı
        
        
        showAlert("success","Başarılı ile eklendi")
    }
    e.preventDefault(); // varsayılan özelligi sıfırlama 
}




//* aldıgı string değeri arayüze list item olarak ekleyecek
function  addTodoToUI(newTodo){
    //List item oluşturma
    const listItem = document.createElement("li");
    listItem.className =  "list-group-item d-flex justify-content-between";

    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#" // linke bir href verelim 
    link.className = "delete-item" // linke class verelim 
    link.innerHTML = "<i class = 'fa fa-remove'></i>"//link içinde icon kullanalım.   

    //text node ekleme 
    listItem.appendChild(document.createTextNode(newTodo))

    listItem.appendChild(link)

    // to do liste :  list itemi ekleme
    todoList.appendChild(listItem)


    // ekledikten sonra valur kısmını boşaltabiliriz.
    todoInput.value = "" 
} 


//! BİLGİLENDİRME MESAJLARI
/*
<div class="alert alert-warning" role="alert">
    This is a warning alert—check it out!
</div>

<div class="alert alert-success" role="alert">
    This is a success alert—check it out!
</div>
*/
function showAlert(type,message){
    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // 1 saniye sonra kaybolmasını istiyorsam : settimeout 2 değer alır 1-fonksiyon ,2-süreyi alır
    setTimeout(function(){  
        alert.remove()
    },1000)
}


//! TODO LARI LOCAL STORAGE A EKLEME..

// storagedan todoları alma
function getTodosFromStorage(){
    let todos; 

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}


function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo)

    localStorage.setItem('todos', JSON.stringify(todos))
}



//! sayfa yüklendigi zaman todoların otomatik yüklenmesi, localstoragendan alarak
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach( function(todo) {
        addTodoToUI(todo)
    })
}


//! todo ları arayüzden silme 
function deleteTodo(e) {
    //* e.target bize nereye basıldıgını verir.
    
    if (e.target.className ==="fa fa-remove") {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Silme işlemi başarılı ")
    }
}

//! silinen elemanları local storagedan silme.

function deleteTodoFromStorage(todo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        if (todo === deleteTodo) {
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify)

}



//! TODOLARI FİLTRELEME

function filterTodos(e){
    

    const filterBody = e.target.value.toLowerCase();

    const listItems = document.querySelectoraAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {
            //bulamadı
            listItem.setAttribute("style","display:none !important")
        } else {
            listItem.setAttribute("style","display:block !important")
        }
    })
} 


//! tüm todoları temizleme
function clearAllTodos(e){
    

    if(confirm("Tümünü silmek istediginize emin misiniz ? ")) {
        //*  todoları arayüzdden kaldırma
        //* todoList.innerHTML = ""; //yavaş yöntem

        //* hızlı yöntem:
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild)
        }
        //local storagedan silinme işlemi
        localStorage.removeItem("todos")
    }   
}