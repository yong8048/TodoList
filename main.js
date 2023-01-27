import { ReadTodos, CreateTodo, UpdateTodo, DeleteTodo } from "./request.js";
import Sortable from "sortablejs";

let preventDoubleClick = false;
const inputEl = document.querySelector(".create input");
const btnEl = document.querySelector(".create button");
const listEl = document.querySelector(".list");
const deleteEl = document.querySelector(".list-delete");
const modalUpdate = document.querySelector(".modal-update");
const modal = document.querySelector(".modal");
const modalSave = document.querySelector(".modal-save");
const modalCancel = document.querySelector(".modal-cancel");

let inputText = "";

new Sortable(listEl, {
  animation: 150,
  ghostClass: "blue-background-class",
});

(async () => {
  const todos = await ReadTodos();
  console.log(todos);
  RenderTodos(todos);
})();

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    inputText = inputEl.value;
    btnEl.click();
  }
});
btnEl.addEventListener("click", async () => {
  inputText = inputEl.value;
  if (inputText == "") {
    alert("입력된 할일이 없습니다.");
    return;
  }
  if (preventDoubleClick) return;

  preventDoubleClick = true;
  await CreateTodo(inputText);

  const todos = await ReadTodos();

  RenderTodos(todos);
  preventDoubleClick = false;
  inputEl.value = "";
});

deleteEl.addEventListener("click", async () => {
  if (!confirm("전체 삭제를 하시겠습니까?")) return;

  const todos = await ReadTodos();

  await todos.map((todo) => {
    DeleteTodo(todo);
  });
  RenderTodos([]);
});

function RenderTodos(todos) {
  const liEls = todos.reverse().map((todo) => {
    const liEl = document.createElement("li");
    liEl.innerHTML = /* html */ `
      <span>${todo.title}</span>
    `;

    const btnUpdate = document.createElement("button");
    btnUpdate.classList.add("btnEdit");
    btnUpdate.addEventListener("click", async () => {
      Modal(todo);

      await UpdateTodo(todo);
      const todos = await ReadTodos();
      RenderTodos(todos);
    });

    liEl.append(btnUpdate);

    const btnDelete = document.createElement("button");

    btnDelete.addEventListener("click", async () => {
      if (!confirm("삭제를 하시겠습니까?")) return;
      await DeleteTodo(todo);
      const todos = await ReadTodos();
      RenderTodos(todos);
    });
    liEl.append(btnDelete);

    return liEl;
  });
  listEl.innerHTML = "";
  listEl.append(...liEls);
}

function Modal(todo) {
  modal.style.display = "block";

  const input = document.querySelector(".modal-input");
  input.value = todo.title;

  modalSave.addEventListener("click", async () => {
    // let todos = ReadTodos();

    // await UpdateTodo(todos);
    modal.style.display = "none";
    const todolist = await ReadTodos();
    RenderTodos(todolist);
  });
}

modalCancel.addEventListener("click", () => {
  modal.style.display = "none";
});
