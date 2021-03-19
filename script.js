var isLoading = false;
var images = [];
var image = {};
var page = 1;

var list = document.querySelector("#list");
var loading = document.querySelector("#loading");
var form = document.querySelector("#form");

const render = (el, f) => { 
  return (p) => el.innerHTML = f(p);
};

const generateLoading = (isLoading) => {
  if (isLoading) {
    render(list, () => { 
      return "";
    })();
    return `
      <img class="loading" src="images/loading.gif"></img>
    `;
  }
  return "";
}

const renderLoading = render(loading, generateLoading);

setLoading = (value) => {
  renderLoading(value);
}

async function fetchImages(page = 1) {
  try {
    setLoading(true);
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`);
    const images = await response.json();

    return images.map(image => ({ 
      favourite: false,
      anotattion: "",
      ...image
    }))
  } catch (err) {
    alert("Houve um erro ao buscar as imagens!")
  } finally {
    setLoading(false);
  }
}

const handleChangeStatusFavourite = (index) => {
  image = images[index];
  image.favourite = !image.favourite;
  images.splice(index, 1, image);
  renderImages(images); 
}

const handleRemoveImage = (index) => {
  images.splice(index, 1)
  renderImages(images);
}

const generateForm = (image) => {
  return `
    <div class="modal" id="modal">
    <div class="modal-container">
        <span class="modal-header">
            <p class="modal-title">Anotação</p>
            <a class="close-button" href="#">&times;</a>
        </span>
    
        <form id="form-image">
            <input type="text" name="anotattion" value="${image.anotattion}" placeholder="Digite a sua anotação aqui:"></input>
        </form>
      
        <a href="#" class="btn save" onclick="handleSaveImage(${image.index})">
          Salvar
        </a>
    </div>      
  </div>  
  `
}

const handleSaveImage = (index) => {
  const image = {}
  var form = document.querySelector('#form-image');

  for ({ name, value } of form) {
    image[name] = value;
  }

  images.splice(index, 1, {...images[index], ...image });
  renderImages(images); 
}

const renderModalEditImage = render(form, generateForm);

const handleEditAnnotateImage = (index) => {
  image = { index, ...images[index]};
  renderModalEditImage(image);
}

const generateImages = (payload) => {
  images = payload;
  return images.map(({ favourite, anotattion, download_url }, index) => {
    return `
      <div class="list-item">
        <img src="${download_url}" class="image"></img>
        <div class="container-btn">
          <a href="#" class="btn favourite" onclick="handleChangeStatusFavourite(${index})">
            ${favourite ? "Desfavoritar" : "Favoritar"}
          </a>

          <a href="#modal" class="btn annotate" onclick=handleEditAnnotateImage(${index})>
            Anotar
          </a>

          <a href="#" class="btn remove" onclick="handleRemoveImage(${index})">
            Remover
          </a>

        </div>
        <div class="annotation">${anotattion}</div>
      </div>
    `
  }).join('');
}

var renderImages = render(list, generateImages);

const loadData = () => {
  fetchImages().then(images => {
    renderImages(images);
  })
}

