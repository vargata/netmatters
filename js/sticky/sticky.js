const container = document.querySelector('.sticky_container');
const header = document.querySelector('.main_header');

let containerHeight = 0;

window.addEventListener('load', function() {
	containerHeight = parseFloat(getComputedStyle(header).height);
	container.style.height = containerHeight.toString() + "px";
	
	let lastScroll = 0;
	let id = null;
	let idPop = null;
	let mouseover = false;
	
	header.addEventListener('mouseover', function(){
		if(id) clearTimeout(id);
		mouseover = true;
	});
	
	header.addEventListener('mouseleave', function(){	
		if(window.scrollY > containerHeight) id = setTimeout(hideSticky, 4000);
		mouseover = false;
	});
	
	document.addEventListener('scroll', function(e){
		
		var scroll = window.scrollY;
		
		if(lastScroll > scroll && scroll > containerHeight){
			if(idPop) clearTimeout(idPop);
			idPop = setTimeout(showSticky, 500);
		} else if (scroll <= containerHeight){
			if(idPop) clearTimeout(idPop);
		}
		
		if(lastScroll < scroll && scroll > containerHeight)
			if(!mouseover)
				hideSticky();
			
		if(scroll == 0)
			removeSticky();
			
		lastScroll = scroll;
		
		if(id) clearTimeout(id);
		if(scroll > containerHeight) id = setTimeout(hideSticky, 4000);
	});
	
	function showSticky(){
		if(!header.classList.contains('stickyshow')){
			header.classList.remove('stickyhide');
			header.classList.add('stickyshow');
		}
	}
	
	function hideSticky(){
		if(header.classList.contains('stickyshow')){
			header.classList.remove('stickyshow');
			header.classList.add('stickyhide');
		}
	}
	
	function removeSticky(){
		if(header.classList.contains('stickyshow') || header.classList.contains('stickyhide')){
			header.classList.remove('stickyshow');
			header.classList.remove('stickyhide');
		}
	}

});

window.addEventListener('resize', function() {
	containerHeight = parseFloat(getComputedStyle(header).height);
	container.style.height = containerHeight.toString() + "px";
});