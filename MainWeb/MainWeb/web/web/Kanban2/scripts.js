document.getElementById('addProjectButton').addEventListener('click', addProject);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('saveChangesButton').addEventListener('click', saveChanges);

let currentEditingProject = null;

function addProject() {
    const projectName = document.getElementById('projectNameTextBox').value.trim();
    if (projectName) {
        const projectList = document.getElementById('projectsList');

        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';

        const projectTitle = document.createElement('span');
        projectTitle.className = 'project-title';
        projectTitle.textContent = projectName;

        const projectActions = document.createElement('div');
        projectActions.className = 'project-actions';

        const goToProjectButton = document.createElement('button');
        goToProjectButton.className = 'button';
        goToProjectButton.textContent = 'Перейти в проект';
        goToProjectButton.onclick = function() {
            // Логика перехода в проект
        };

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'delete-project';
        deleteIcon.textContent = '✖';
        deleteIcon.onclick = function() {
            if (confirm('Вы уверены что хотите удалить проект?')) {
                projectList.removeChild(projectItem);
            }
        };

        projectActions.appendChild(goToProjectButton);
        projectActions.appendChild(deleteIcon);

        projectItem.appendChild(projectTitle);
        projectItem.appendChild(projectActions);

        projectItem.ondblclick = function() {
            openModal(projectItem, projectTitle.textContent);
        };

        projectList.appendChild(projectItem);

        document.getElementById('projectNameTextBox').value = '';
    }
}

function openModal(projectItem, projectTitle) {
    currentEditingProject = projectItem;
    document.getElementById('editProjectName').value = projectTitle;
    document.getElementById('editProjectDescription').value = projectItem.dataset.description || '';
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveChanges() {
    const newTitle = document.getElementById('editProjectName').value.trim();
    const newDescription = document.getElementById('editProjectDescription').value.trim();
    if (currentEditingProject && newTitle) {
        currentEditingProject.querySelector('.project-title').textContent = newTitle;
        currentEditingProject.dataset.description = newDescription;
        closeModal();
    }
}
