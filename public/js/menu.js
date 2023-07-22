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

// TOGGLE SIDEBAR
const menuBar = document.querySelector('.contenido nav .bx.bx-menu');
const sidebar = document.querySelector('.menu');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
}


