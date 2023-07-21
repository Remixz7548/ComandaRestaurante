const menu = document.querySelectorAll('.menu .submenu li a');

menu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		menu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});