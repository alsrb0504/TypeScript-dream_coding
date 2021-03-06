import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement>{
  constructor(title:string, url:string) {
    super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h2 class="page-item__title video__title"></h2>
          </section>`);

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url); // url -> videoId

    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // input
  // https://www.youtube.com/watch?v=ly7UabPJNvs
  // https://youtu.be/ly7UabPJNvs
  // output
  // https://www.youtube.com/embed/ly7UabPJNvs

  private convertToEmbeddedURL(url:string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if(videoId){
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/ly7UabPJNvs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
