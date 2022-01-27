<template>
  <div>
    <input :value="note.title" @input="updateTitle" />
    <h2>{{ note.title }}</h2>
    <hr />
    <ul>
      <TodoItem
        v-for="(todo, index) in note.todos"
        :todo="todo"
        :key="index"
        @remove-todo="onRemoveTodo(index)"
        @update-todo="onUpdateTodo($event, index)"
        @checkbox-click="onCheckboxClick($event, index)"
      />
    </ul>
    <div class="new-todo">
      <button @click="addNewTodo">Add Todo</button>
      <span @click="addNewTodo">Add New Todo</span>
    </div>
    <hr />
    <div>
      <button @click="saveNote">Save</button>
      <button @click="cancelEdit">Cancel</button>
      <button @click="DeleteNote">Delete</button>
    </div>
    <hr />
    <Test :dataSet="dataSet" />
    <a @click="test" href="#">asdgsadg</a>
  </div>
</template>

<script lang="ts">
import TodoItem from "@/components/ToDoItem.vue";
import { defineComponent, computed, onMounted } from "vue";
import Note from "@/models/NoteModel";
import ToDo from "@/models/ToDoModel";
import Test from "@/components/Test.vue";
import store from "@/store";
import router from "@/router";
import dataSet from "@/models/aModel";

export default defineComponent({
  name: "Note",
  components: {
    TodoItem,
    Test,
  },
  setup() {
    const note = computed(() => store.state.currentNote);

    const test = () => {
      // dataSet.smart = ""
      // console.log({test: dataSet.smart});
    };
    let dataSet: dataSet = {
      smart: [
        { test: "12412", indexDataSet: 12 },
        { test: "1244124", indexDataSet: 12 },
      ],
    };

    const saveNote = () => {
      store.dispatch("saveNote");
      router.push("/");
    };
    const DeleteNote = () => {
      store.commit("deleteNote", note);
      router.push("/");
    };

    const { currentRoute } = router;
    const fetchNote = () => {
      if (currentRoute.value.params.id) {
        const routeId: number = +currentRoute.value.params.id;
        store.dispatch("fetchCurrentNote", routeId);
      } else {
        const id = store.getters.getIdOfLastNote + 1;
        store.commit("setCurrentNote", {
          title: "",
          todos: [] as ToDo[],
          id: id,
        });
      }
    };
    onMounted(fetchNote);

    const updateTitle = (e: { target: { value: string } }) => {
      store.commit("updateTitle", e.target.value);
    };

    const addNewTodo = () => {
      store.commit("addNewTodo");
    };

    const onRemoveTodo = (index: number) => {
      store.commit("deleteTodo", index);
    };
    const onUpdateTodo = (text: never, index: never) => {
      let todos = JSON.parse(JSON.stringify(store.state.currentNote.todos));

      todos[index].text = text;
      store.commit("updateTodos", todos);
    };
    const onCheckboxClick = (value: boolean, index: number) => {
      let todos = JSON.parse(JSON.stringify(store.state.currentNote.todos));

      todos[index].completed = value;
      store.commit("updateTodos", todos);
    };

    const cancelEdit = () => {
      if (currentRoute.value.params.id) {
        // undo changes
      } else {
        console.log("fdas");
      }
      router.push("/");
    };
    const clearNote = () => {
      const id = store.getters.getIdOfLastNote + 1;
      store.commit("setCurrentNote", {
        title: "",
        todos: [] as ToDo[],
        id: id,
      } as Note);
    };

    return {
      test,
      note,
      saveNote,
      addNewTodo,
      cancelEdit,
      onRemoveTodo,
      onUpdateTodo,
      DeleteNote,
      clearNote,
      updateTitle,
      onCheckboxClick,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.clearNote();
    next();
  },
});
</script>

<style>
.new-todo {
  display: flex;
  justify-content: flex-start;
  background-color: #e2e2e2;
  height: 36px;
  margin: 5px 0px;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 15px;
  border-radius: 5px;
}
</style>
