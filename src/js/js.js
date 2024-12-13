document.addEventListener('DOMContentLoaded', function() {
    navfija();
    createGallery();
    resaltarEnlace();
    scrollNav();
})

function navfija() {
    const header = document.querySelector('.header');
    const aboutFestival = document.querySelector('.sobre-fest');

    document.addEventListener('scroll', function() {
        if(aboutFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function createGallery() {
    const gallery = document.querySelector('.galeria-imagen');

    for(let i = 1; i <= 16; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;

        imagen.classList.add('imagen');
        gallery.appendChild(imagen);

        //Event handler
        imagen.onclick = function () {
            mostrarimagen(i);
        }
    }
}

function mostrarimagen(i) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;s
    //Generando el modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = function () {
        cerrarModal();
    }

    //Agregando el boton X en las imagenes del modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('bt-cerrar');
    cerrarModalBtn.onclick = function() {
        cerrarModal();
    }

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    //Agregando al HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden');
    body.appendChild(modal);

}

function cerrarModal() {

    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden');
    }, 500);
    
}

//Codigo para dar scroll y saber en donde estamos ubicado y que se marque en el header de nav.
function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const section = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navPrin a');

        let actual = '';
        section.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        })

        navLinks.forEach (link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navPrin a');

    navLinks.forEach(link => {

        link.addEventListener('click', evento => {
            evento.preventDefault();

            const sectionScroll = evento.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});

        })
    })
}