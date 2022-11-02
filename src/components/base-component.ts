import _ from 'lodash';

export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);

    console.log(_.shuffle([1, 2, 3, 4]));
  }

  private attach(insertAtBeginning: boolean) {
    const insertPosition = insertAtBeginning ? 'afterbegin' : 'beforeend';
    this.hostElement.insertAdjacentElement(insertPosition, this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
