/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: ProjectStatus) {
      super('project-list', 'app', false, `${type.toLowerCase()}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter(
          (project) => project.status === ProjectStatus[this.type]
        );
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector(
        'h2'
      )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
      // Only allow drag over if event has data transfer type of text/plain
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
      }
    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.remove('droppable');
    }

    @Autobind
    dropHandler(event: DragEvent) {
      event.preventDefault();
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.remove('droppable');

      const projectId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(projectId, ProjectStatus[this.type]);
    }

    private renderProjects() {
      const listElement = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;

      listElement.textContent = '';

      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
      }
    }
  }
}
