var __NOW__TASK = null;

function addTask()
{
  let form = document.forms.todo__fill_form;  // Берем форму для заполнения задачи
  __clear_form(form);
  form.parentNode.classList.remove("hide"); // Делаем ее видимой и доступной
}

function removeTask(task)
{
  let ul = task.parentNode.parentNode

  if (ul.childElementCount == 1)
  {
  /* Скрытие и инициализация оставшегося элемента */
    ul.children[0].classList.add("empty");
    let li = ul.children[0];
    li.children[0].checked = false;
    li.children[1].innerHTML = "";
  }
  else
  {
    task.parentNode.remove(); // Удаляем задачу из списка (для этого обращаемся к родительскому элементу li)
  }

}

function editTask(task)
{
  let form = document.forms.todo__fill_form;  //  Берем форму для редактирования задачи
  form.parentNode.classList.remove("hide");  // Делаем ее видимой и доступной

  let li = task.parentNode;  // Находим элемент ЛИ, в котором содержаться данные для нашей задачи
  form.elements[0].value = li.children[1].textContent;  // Копируем данные из спана в инпут формы (текст задачи)
  if (li.children[1].childElementCount)  // Если у спана (в котором текст задачи) есть дочерние элементы
    form.elements[1].checked = true;  // То там есть изображения приоритета, и отмечаем инпут с приоритетом в форме
  else
    form.elements[1].checked = false;

  __NOW__TASK = li;
}

function saveTask(task)
{
  let form = document.forms.todo__fill_form;
  let img_hight_prio = document.getElementsByClassName('todo-list__task__item__img')[0];

  if (__NOW__TASK)
  {
    if (form.elements[1].checked) { __NOW__TASK.children[1].appendChild(img_hight_prio); }
    __NOW__TASK.children[1].textContent =  form.elements[0].value;
  }
  else
  {
    let ul = document.getElementsByClassName('todo-list__tasks')[0];
    let new_elem = ul.children[0].cloneNode(true);
    if (form.elements[1].checked) { new_elem.children[1].appendChild(img_hight_prio); }
    new_elem.children[1].textContent = form.elements[0].value;
    ul.appendChild(new_elem);
  }

  __NOW__TASK = null;

  __clear_form(form);

}

function cancelTask(button)
{
  let form = button.parentNode; //Берем форму

  __clear_form(form); // Чистим форму

  form.parentNode.classList.add("hide");  // Берем общий контейнер див и прячем его
}

function task_status(task)
{
  let li = task.parentNode;

  for (let i = 0; i < li.childElementCount; ++i) { // Идем по элементам задачи для их редактирования
    if (li.children[i].tagName == "SPAN") { li.children[i].classList.toggle("task_completed_span") } // Зачеркиваем текст или наоборот
    if (li.children[i].tagName == "IMG") { li.children[i].classList.toggle("task_completed_img") } // Изменяем прозрачность картинок или наоборот
  }

}

function __clear_form(form)
{
  form.elements[0].value = "";  // Очищаем поле ввода описания задачи
  form.elements[1].checked = false; // Очищаем чекбокс с выбором приоритета задачи
}
