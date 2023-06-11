function showObjects() {
  var objectsContainer = document.getElementById('objectsContainer');
  objectsContainer.innerHTML = '';

  var floor = document.querySelector('input[name="floor"]:checked').value;

  fetch('data/routers.json')
    .then(response => response.json())
    .then(data => {
      if (floor in data && objectVisibility.router) {
        data[floor].forEach(obj => {
          var icon = createIconElement('router', obj);
          objectsContainer.appendChild(icon);
        });
      }
    });

  fetch('data/servers.json')
    .then(response => response.json())
    .then(data => {
      if (floor in data && objectVisibility.server) {
        data[floor].forEach(obj => {
          var icon = createIconElement('server', obj);
          objectsContainer.appendChild(icon);
        });
      }
    });

  fetch('data/computers.json')
    .then(response => response.json())
    .then(data => {
      if (floor in data && objectVisibility.computer) {
        data[floor].forEach(obj => {
          var icon = createIconElement('computer', obj);
          objectsContainer.appendChild(icon);
        });
      }
    });
}


function createIconElement(type, obj) {
  var icon = document.createElement('img');
  icon.classList.add('icon')
  icon.src = 'assets/icons/' + type + '-icon.png';
  icon.alt = obj.name;
  icon.title = obj.name;
  icon.style.position = 'absolute';
  icon.style.left = obj.x + 'px';
  icon.style.top = obj.y + 'px';
  //icon.addEventListener('click', function() {
  //  showObjectInfo(obj);
 // });
  return icon;
}

function showFloorPlan(floor) {
  // Очистить контейнер с объектами перед добавлением новых
  document.getElementById("objectsContainer").innerHTML = "";

  // Загрузить план этажа
  var floorPlanImage = document.getElementById("floorPlanImage");
  floorPlanImage.src = "assets/" + floor + ".png";


  // Показать объекты на этаже
showObjects('router');
}

var objectVisibility = {
  router: false,
  server: false,
  computer: false
};

function toggleObjectVisibility(type) {
  objectVisibility[type] = !objectVisibility[type];
  showObjects();
}

function toggleAllObjectsVisibility(checked) {
  objectVisibility.router = checked;
  objectVisibility.server = checked;
  objectVisibility.computer = checked;
  showObjects();
}

function selectAll() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = true;
  });
  toggleAllObjectsVisibility(true);
}

function clearSelection() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
  toggleAllObjectsVisibility(false);
}

function toggleSidebar() {
  var floorbar = document.querySelector('.floors');
  floorbar.classList.toggle('open');
  var sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}


