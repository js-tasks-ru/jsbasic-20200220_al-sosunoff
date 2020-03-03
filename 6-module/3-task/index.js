"use strict";

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>
    
      </ul>
    </li>
  
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>
    
       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>
    
      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    element.innerHTML = this.template;

    let list = element.querySelectorAll(".list-group-item");

    let backdrop = document.querySelector(".backdrop");

    list.forEach(e => {
      
      e.addEventListener("pointerenter", (event) => {
        let dropdownMenu = event.target.querySelector(".dropdown-menu");

        dropdownMenu.classList.add("show");

        backdrop.classList.add("show");
      });

      e.addEventListener("pointerleave", (event) => {
        let dropdownMenu = event.target.querySelector(".dropdown-menu");

        dropdownMenu.classList.remove("show");

        backdrop.classList.remove("show");
      });
    
    });
  }

/*   _strategyOnClick(event, cls) {
    function upperFirstCharacterInWord(word) {
      return word[0].toUpperCase() + word.slice(1);
    }

    function camelize(str) {
      let words = str.split(/-/);
      return (
        words[0] +
        words
          .slice(1)
          .map(upperFirstCharacterInWord)
          .join("")
      );
    }

    let method = camelize(cls.replace(".", ""));

    if (this[method]) {
      this[method](event, cls);
    }
  } */
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;
