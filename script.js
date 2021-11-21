var __NOW__TASK = null;

function addTask()
{
  let form = document.forms.todo__fill_form;  // Берем форму для заполнения задачи
  __clear_form(form); // чистим форму
  form.parentNode.classList.remove("hide"); // Делаем ее видимой и доступной
}

function removeTask(task)
{
  task.parentNode.remove(); // Удаляем задачу из списка (для этого обращаемся к родительскому элементу li)
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

  __NOW__TASK = li; // Почемаем в глобальной переменной, что  в форме редактируется существующая задача
}

function saveTask(task)
{
  let form = document.forms.todo__fill_form;  // Берем форму для схранения задачи
  let img_hight_prio = document.getElementsByClassName('todo-list__task__item__img')[0].cloneNode(true);  // Копия картинки высокого приоритета

  if (form.elements[0].value == "") {  __clear_form(form); return; }  // Если описание задачи отсутсвует, то выходим

  if (__NOW__TASK)  // Если в форме сейчас находится редактируемая задача
  {
    __NOW__TASK.children[1].innerHTML = "";  // Чистим поле span
    if (form.elements[1].checked) { __NOW__TASK.children[1].append(img_hight_prio); }  // Если выбран высокий приритет, добавляем картинку в span
    __NOW__TASK.children[1].innerHTML += form.elements[0].value;  // после картинки добавляем описание задачи
  }
  else  // Если сохраняем новую задачу, то
  {
    let ul = document.getElementsByClassName('todo-list__tasks')[0];  // Находим элемент со всеми задачами
    let new_elem = ul.children[0].cloneNode(true);  // Клонируем скрытый шаблон для новых задач
    new_elem.classList.remove("empty");   // Делаем нескрытным
    new_elem.children[1].innerHTML = "";  // Чистим поле span
    if (form.elements[1].checked) { new_elem.children[1].append(img_hight_prio); }  // Если выбран высокий приритет, добавляем картинку в span
    new_elem.children[1].innerHTML += form.elements[0].value;  // после картинки добавляем описание задачи
    ul.appendChild(new_elem);  // Добавляем элемент в наш общий список задач
  }

  __NOW__TASK = null;  // Перед закрытием формы сбрасываем переменную хранения редактируемой формы

  __clear_form(form);  // Чистка формы

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
