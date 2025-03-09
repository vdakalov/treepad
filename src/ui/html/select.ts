import Ui from '../../libs/ui';

export enum Event {
  Changed = 'Changed',
}

type EventArgsMap = {
  [Event.Changed]: [newValue: string, previousValue: string];
};

export type Option = {
  value: string;
  text: string;
};

export default class SelectUi extends Ui<HTMLSelectElement, EventArgsMap> {

  public get value(): string {
    return this.uiNodeElement.value;
  }

  public set value(value: string) {
    this.uiNodeElement.value = value;
  }

  constructor(_default: string | number, options: Option[]) {
    super('select');
    this.setOptions(_default, options);
  }

  public setOptions(_default: string | number, options: Option[]): void {
    this.uiNodeElement.textContent = '';
    for (const [index, { value, text }] of options.entries()) {
      const option = window.document.createElement('option');
      this.uiNodeElement.appendChild(option);
      option.textContent = text;
      option.value = value;
      option.defaultSelected = _default === value || _default === index;
    }
  }
}
