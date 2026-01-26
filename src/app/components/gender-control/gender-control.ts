import { Component, input, model, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export interface GenderType {
  id: string;
  name: string;
}

@Component({
  selector: 'gender-control',
  templateUrl: './gender-control.html',
  styleUrl: './gender-control.css',
  host: {
    '[class.disabled]': 'disabled()',
  },
})
export class GenderControl implements FormValueControl<GenderType | null> {
  genders = signal<GenderType[]>([
    {
      id: '0',
      name: 'М',
    },
    {
      id: '1',
      name: 'Ж',
    },
  ]);

  readonly value = model<GenderType | null>(null);

  readonly disabled = input(false);
  readonly required = input(false);

  protected isSelected(gender: GenderType) {
    return this.value()?.id === gender.id;
  }
}
