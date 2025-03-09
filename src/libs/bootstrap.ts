import Application from '..';
import Ui from './ui';

const application = (window as any).application = new Application();
Ui.mount(window.document.body, application);
