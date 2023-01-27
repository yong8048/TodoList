const headers = {
  "Content-Type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_LeeSeungYong",
};

export async function CreateTodo(title) {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        title,
      }),
    }
  );
  const json = await res.json();
  console.log(json);
}

export async function ReadTodos(todos) {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "GET",
      headers,
    }
  );
  const json = await res.json();
  return json;
}

export async function UpdateTodo(todo) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        title: `${todo.title}!`,
        done: todo.done,
      }),
    }
  );
}

export async function DeleteTodo(todo) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: "DELETE",
      headers,
    }
  );
}
