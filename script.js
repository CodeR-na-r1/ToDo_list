function addTask()
{
  let form = document.forms.todo__fill_form;  // Берем форму для заполнения задачи
  form.parentNode.classList.remove("hide"); // Делаем ее видимой и доступной
}

function removeTask(task)
{

}

function editTask(task)
{
  let form = document.forms.todo__fill_form;  //  Берем форму для редактирования задачи
  form.parentNode.classList.remove("hide");  // Делаем ее видимой и доступной

  let li = task.parentNode;  // Находим элемент ЛИ, в котором содержаться данные для нашей задачи
  form.elements[0].value = li.children[1].textContent;  // Копируем данные из спана в инпут формы (текст задачи)
  if (li.children[1].childElementCount)  // Если у спана (в котором текст задачи) есть дочерние элементы
    form.elements[1].checked = true;  // То там есть изображения приоритета, и отмечаем инпут с приоритетом в форме
}

function saveTask(task)
{


}

function cancelTask(button)
{
  let form = button.parentNode; //Берем форму

  __clear_form(form);

  form.parentNode.classList.add("hide");  // Берем общий контейнер див и прячем его
}

function task_status(task)
{
  let li = task.parentNode;

  for (let i = 0; i < li.childElementCount; ++i) {
    if (li.children[i].tagName == "SPAN") { li.children[i].classList.toggle("task_completed_span") }
    if (li.children[i].tagName == "IMG") { li.children[i].classList.toggle("task_completed_img") }
  }

}

function __clear_form(form)
{
  form.elements[0].value = "";  // Очищаем поле ввода описания задачи
  form.elements[1].checked = false; // Очищаем чекбокс с выбором приоритета задачи
}
