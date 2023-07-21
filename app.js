import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsO9hgphHigNbRG3hRq3hwnWH86MHB1zE",
  authDomain: "todowithfirebase-3e50a.firebaseapp.com",
  projectId: "todowithfirebase-3e50a",
  storageBucket: "todowithfirebase-3e50a.appspot.com",
  messagingSenderId: "302244546161",
  appId: "1:302244546161:web:a3fdaef52d4fd98b86fdd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

var input = document.getElementById("todoInput")
var ulParent =document.getElementById("ulParent")
const addBtn = document.querySelector("#addBtn")
const todoCollection = collection(db,"todos")


addBtn.addEventListener("click",addTodo)

window.addEventListener("load",getTodos)


async function getTodos() {
    try {
        
        const querySnapshot = await getDocs(todoCollection)
        querySnapshot.forEach(function (doc) {
            // console.log(doc.id, doc.data())
            const todoValue = doc.data().todo
            createUI(todoValue, doc.id)
            // arr.push({
            //     id: doc.id,
            //     todo: doc.data()
            // })
        });
        // console.log("array", arr)


    } catch (error) {
        console.log(error.message, "error")
        alert(error.message)
    }
}

async function addTodo() {
    try {
        if (!input.value) {
            alert("ENTER TODO VALUEs")
            return
        }
        const data = {
            todo: input.value
        }
        const docRef = await addDoc(todoCollection, data)
        console.log("Document written with ID: ", docRef.id);
        createUI(input.value, docRef.id)
        input.value = ""
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}


async function editTodo(el) {
    // console.log("editTodo()", el.target.parentNode.parentNode.
    //     firstChild.nodeValue)
    try {

        var li = el.target.parentNode.parentNode
        var placeHolder = li.firstChild.nodeValue
        var editValue = prompt("Edit Todo", placeHolder)
        console.log(li.id, "id")
        const updateData = await updateDoc(doc(db, "todos", li.id), {
            todo: editValue
        })

        console.log("editValue", editValue)
        li.firstChild.nodeValue = editValue

    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }


}

    

    
    
function deleteTodo(elem) {

    elem.target.parentNode.parentNode.remove()
}

function createUI(todoValue, id) {
    const todoUI = `
    <li id=${id} class="list-group-item d-flex align-items-center justify-content-between">
    ${todoValue}
 
    <div>
         <button class="btn btn-info" id="editBtn" >EDIT</button>
         <button class="btn btn-danger" id="deleteBtn" >DEL</button>
     </div>
     </li>
 `
     ulParent.innerHTML += todoUI
 
     const editBtn = document.querySelector("#editBtn")
     const deleteBtn = document.querySelector("#deleteBtn")
 
 
     editBtn.addEventListener("click",editTodo)
     deleteBtn.addEventListener("click",deleteTodo)
 
         
 }