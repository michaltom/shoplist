const listInput = document.querySelector('.list-input');
const listButton = document.querySelector('.list-button');
const listItems = document.querySelector('.list-items');

document.addEventListener('DOMContentLoaded', getList);
listButton.addEventListener('click', addToList);
listItems.addEventListener('click', buttonEvents);

//emptyList();
function addToList(e) {
	e.preventDefault();
	if (!listInput.value) return;
	const item = listInput.value;
	const listDiv = document.createElement('div');
	listDiv.classList.add('item-box');
	// listDiv.classList.add('box-shadow');

	const newItem = document.createElement('li');
	newItem.innerText = item;
	newItem.classList.add('item');
	listDiv.appendChild(newItem);

	//add item to lacal storage
	saveShopList(listInput.value);

	const doneButton = document.createElement('button');
	doneButton.innerText = 'O';
	doneButton.classList.add('done-button');
	listDiv.appendChild(doneButton);

	const removeButton = document.createElement('button');
	removeButton.innerText = 'X';
	removeButton.classList.add('remove-button');
	listDiv.appendChild(removeButton);

	listItems.insertBefore(listDiv, listItems.firstChild);

	emptyList();

	listInput.value = '';
}

function buttonEvents(e) {
	const item = e.target;
	if (item.classList[0] === 'remove-button') {
		const itemParent = item.parentElement;
		removeLocalLists(itemParent);
		itemParent.remove();
		emptyList();
	}

	// if (item.parentElement.classList[1]) {
	// 	unDoneToButton(item);
	// }

	if (item.classList[0] === 'done-button') {
		item.parentElement.classList.toggle('item-done');
		// if (item.parentElement.classList[1]) {
		doneToButton(item);
		// }
	}
}

function doneToButton(item) {
	let temp = item.parentElement;
	item.parentElement.remove();
	if (item.parentElement.classList[1]) {
		listItems.appendChild(temp);
	} else {
		listItems.insertBefore(temp, listItems.firstChild);
	}
}
// function unDoneToButton(item) {
// 	let temp = item.parentElement;
// 	item.parentElement.remove();
// 	listItems.insertBefore(temp, listItems.firstChild);
// }

function saveShopList(list) {
	let lists;
	if (localStorage.getItem('lists') === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem('lists'));
	}
	lists.push(list);
	localStorage.setItem('lists', JSON.stringify(lists));
}

function getList() {
	let lists;
	if (localStorage.getItem('lists') === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem('lists'));
	}
	lists.forEach(function(list) {
		const item = list;
		const listDiv = document.createElement('div');
		listDiv.classList.add('item-box');

		const newItem = document.createElement('li');
		newItem.innerText = item;
		newItem.classList.add('item');
		listDiv.appendChild(newItem);

		const doneButton = document.createElement('button');
		doneButton.innerText = 'O';
		doneButton.classList.add('done-button');
		listDiv.appendChild(doneButton);

		const removeButton = document.createElement('button');
		removeButton.innerText = 'X';
		removeButton.classList.add('remove-button');
		listDiv.appendChild(removeButton);

		listItems.insertBefore(listDiv, listItems.firstChild);
	});
	emptyList();
	console.log(listItems.childNodes.length);
}

function removeLocalLists(list) {
	let lists;
	if (localStorage.getItem('lists') === null) {
		lists = [];
	} else {
		lists = JSON.parse(localStorage.getItem('lists'));
	}
	const itemIndex = list.children[0].innerText;
	lists.splice(lists.indexOf(itemIndex), 1);
	localStorage.setItem('lists', JSON.stringify(lists));
}

function emptyList() {
	listItems.childNodes.length === 1 ? (listItems.style.display = 'none') : (listItems.style.display = 'block');
}
