class Appliance {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class ApplianceList {
  constructor(appliances, listContainerId, selectId, addButtonId) {
    this.appliances = appliances;
    this.listContainer = document.getElementById(listContainerId);
    this.grid = document.querySelector('.grid');
    this.select = document.getElementById(selectId);
    this.addButton = document.getElementById(addButtonId);

    this.addButton.addEventListener('click', () => this.addApplianceFromDropdown());
  }

  displayAppliances() {
    this.grid.innerHTML = ''; 
    this.appliances.forEach(appliance => {
      const li = document.createElement('li');
      li.className = 'appliance';
      const encodedName = encodeURIComponent(appliance.name);

      li.innerHTML = `
        <div class="appliance-button">
          <a href="pages/${appliance.id}/${encodedName}.html" target="_blank">${appliance.name}</a>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      li.addEventListener('click', () => {
        this.createApplianceInstance(appliance);
      });
      
      li.querySelector('.delete-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        this.removeAppliance();
      });

      this.grid.appendChild(li);
    });
    this.listContainer.style.display = 'block'; 
  }

  createApplianceInstance(applianceData) {
    const applianceInstance = new Appliance(applianceData.id, applianceData.name);
  }

  addApplianceFromDropdown() {
    const selectedApplianceId = this.select.value;
    if (!selectedApplianceId) {
      return; 
    }
    const selectedApplianceName = this.select.options[this.select.selectedIndex].text;
    const newAppliance = new Appliance(selectedApplianceId, selectedApplianceName);

    this.appliances.push(newAppliance);
    this.displayAppliances(); 
  }

  removeAppliance(index) {
    this.appliances.splice(index, 1);
    this.displayAppliances();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const appliances = [
  ];

  new ApplianceList(appliances, 'appliancelist', 'applianceselect', 'addappliance');
});