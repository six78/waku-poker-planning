import { Form, FormInstance } from 'antd';
import { useEffect, useRef, useState } from 'react';

interface IFormServiceConfig<T extends object> {
  form: FormInstance<T>;
  initialValue: T;
  onFinish: (changes: Partial<T> | null) => void
}

export function useFormService<T extends object>(config: Omit<IFormServiceConfig<T>, 'form'>) {
  const [form] = Form.useForm<T>();
  const [formService, setFormService] = useState<FormService<T> | null>(null);

  useEffect(() => {
    setFormService(
      new FormService({
        form,
        ...config
      })
    )
  }, []);

  return formService;
}

export class FormService<T extends object> {
  public readonly instance: FormInstance<T>;
  public readonly onFinish: ((changes: Partial<T> | null) => void);
  private readonly initialValue: T;

  constructor(config: IFormServiceConfig<T>) {
    this.instance = config.form;
    this.initialValue = config.initialValue;
    this.reset();
    this.onFinish = () => {
      const changes = this.getChanges();
      const hasChanges = Object.keys(changes).length > 0;
      config.onFinish(hasChanges ? changes : null);
    }
  }

  public reset(): void {
    this.instance.setFieldsValue(this.initialValue);

  }

  private getChanges(): Partial<T> {
    const newValue = this.instance.getFieldsValue();
    const changes: Partial<T> = {};

    for (const key in this.initialValue) {
      if (
        Object.prototype.hasOwnProperty.call(this.initialValue, key) &&
        Object.prototype.hasOwnProperty.call(newValue, key)
      ) {
        if (this.initialValue[key] !== newValue[key]) {
          changes[key] = newValue[key];
        }
      }
    }

    return changes;
  }
}