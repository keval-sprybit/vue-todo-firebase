<template>
  <div class="todo-class">

    <form @submit.prevent="addTodo" class=" dark:bg-slate-600">
      <div class="relative">
        <input type="text"
          class="block w-full p-4 pl-10 text-sm  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-lime-500 focus:border-lime-500 dark:bg-pink-700 dark:border-lime-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          placeholder="Todo..." v-model="newTodoContent" />
        <button
          class="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          :disabled="!newTodoContent">Add</button>
      </div>
    </form>


    <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <li class="pt-3 pb-0 sm:pt-4 shadow-md" v-for="(todo, index) in todos" v-bind:key="todo.id">


        
        <div class="flex bg-grey-light w-full h-auto p-2 mt-4 rounded-lg"
          :class="todo.status ? '  bg-lime-100' : '  bg-lime-300'">
          <h3 class="w-5/6 font-sans font-light text-2xl text-left bg-grey-lightest pt-1 rounded-lg"
            :class="{ 'line-through': todo.status }"> {{ todo.title }}</h3>
          <div class="w-1/6 text-right pr-2 xHolder">

            <button type="button"
              class="focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
              :class="todo.status ? ' bg-green-500' : ' bg-green-700'" @click="doneTodo(todo.id)">+</button>
          </div>
          <div class="w-1/6 text-right pr-2 xHolder">

            <button type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              @click="removeTodo(todo.id)">- </button>
            <!-- <font-awesome-icon icon="fas fa-spinner fa-spin" rotation="90"  /> -->
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>


<script>

export default {

}
</script>

<script setup>

import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDocs, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const todos = ref([
  {
    id: '1',
    title: 'Wake up',
    status: true
  },
  {
    id: '2',
    title: 'eat',
    status: false
  },
  {
    id: '3',
    title: 'sleep',
    status: false
  }

])

const newTodoContent = ref('')
const todosCollectionRef = collection(db, "todo-vue")
const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    title: newTodoContent.value,
    status: false
  }
  todos.value.unshift(newTodo)
  /* addDoc(todosCollectionRef, {
     title: newTodoContent.value,
     status: false
   }); */
  newTodoContent.value = ''
}

const removeTodo = id => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  // deleteDoc(doc(todosCollectionRef, id))
}
const doneTodo = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  todos.value[index].status = !todos.value[index].status

  /* updateDoc(doc(todosCollectionRef, id), {
    status: !todos.value[index].status
  }); */
}
onMounted(async () => {

  /* const querySnapshot = await getDocs(collection(db, "todo-vue"));
  let fbTodos = []
  querySnapshot.forEach((doc) => {
    const todo = {
      id: doc.id,
      title: doc.data().title,
      status: doc.data().status
    }
    fbTodos.push(todo)
  })
  todos.value = fbTodos */

  // const querySnapshot = await getDocs(collection(db, "todo-vue"));
  /* onSnapshot(todosCollectionRef, (querySnapshot) => {
    let fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        title: doc.data().title,
        status: doc.data().status
      }
      fbTodos.push(todo)
    });
    todos.value = fbTodos
  });*/
}
)


</script>
<style>
.todo-class {
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;

  /* background: linear-gradient(to right,#39abdf,#63bc5e); */


}
</style>
