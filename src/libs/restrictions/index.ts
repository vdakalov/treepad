import Rule from './rule';

export default class Restrictions<T> {

  public rule: Rule;

  public items: T[];

  constructor(rule: Rule, items: T[]) {
    this.rule = rule;
    this.items = items;
  }
}
