import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElementOption, FormElement } from '../../../../simple-forms.types';
import { ElementBaseComponent } from '../../element-base/element-base.component';

@Component({
  selector: 'app-grouped-checkbox-question',
  templateUrl: './grouped-checkbox-question.component.html',
  styleUrls: ['./../checkbox.component.scss', './grouped-checkbox-question.component.scss']
})
export class GroupedCheckboxQuestionComponent extends ElementBaseComponent implements OnInit {

  checkboxGroup: FormGroup;
  @Input() formGroup: FormGroup;
  @Input() elementData: FormElement;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.checkboxGroup = this.formBuilder.group(this.getOptions());
    this.checkboxGroup.valueChanges.subscribe(value => {
      this.updateParentFormGroup(value);
    });
  }

  getOptions() {
    const childForm: {} = {};
    this.elementData.optionGroups.forEach((optionGroup: { groupName: string, options: ElementOption[]}) => {
      optionGroup.options.forEach((option: ElementOption) => {
        childForm[option.value] = [''];
      });
    });
    return childForm;
  }

  updateParentFormGroup(value: {}) {
    this.formGroup.controls[this.elementData.inputId].setValue(value);
  }
}
