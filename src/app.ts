import { Component } from './components/component.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dislog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent, PageItemCompoent } from './components/page/page.js';

type InputComponentConstructor<T= (MediaData | TextData) & Component> = {
  new(): T;
}

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemCompoent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput, 
      (input)=> new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video', 
      MediaSectionInput, 
      (input)=> new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note', 
      TextSectionInput, 
      (input)=> new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo', 
      TextSectionInput, 
      (input)=> new TodoComponent(input.title, input.body)
    );


    // For demo :)
    this.page.addChild(new ImageComponent("Image Title", 'https://picsum.photos/600/300'));
    this.page.addChild(new VideoComponent("video title", 'https://www.youtube.com/embed/ly7UabPJNvs'))
    this.page.addChild(new NoteComponent("Note Title", "note"));
    this.page.addChild(new TodoComponent("Todo Title", "hi"))
  }


  private bindElementToDialog<T extends (MediaData | TextData) & Component >(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ){
    const element = document.querySelector(selector)! as HTMLElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(()=> {
        dialog.removeFrom(this.dialogRoot);
      })
      dialog.setOnSubmitListener(()=> {
        const todo = makeSection(input);
        this.page.addChild(todo);
        dialog.removeFrom(this.dialogRoot);
      })
    })
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body)