import { defineRule } from 'vee-validate';

export const rules = [
  defineRule('required', (value: any) => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    return true;
  }),
  defineRule('email', (value: any) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    // Check if email
    if (!(/\S+@\S+\.\S+/.test(value))) {
      return 'This field must be a valid email';
    }
    return true;
  }),
  defineRule('min', (value: any, [limit]: number[]) => {
    // The field is empty so it should pass
    const isNum = typeof (value) === 'number';
    if (!value || (!isNum && !value.length)) {
      return true;
    }
    if ((isNum ? value : value.length) < limit) {
      return `This field must be at least equal to ${limit} ${isNum ? '' : 'characters'}`;
    }
    return true;
  }),
  defineRule('max', (value: any, [limit]: number[]) => {
    // The field is empty so it should pass
    const isNum = typeof (value) === 'number';
    if (!value || (!isNum && !value.length)) {
      return true;
    }
    if ((isNum ? value : value.length) > limit) {
      return `This field must be at least equal to ${limit} ${isNum ? '' : 'characters'} as maximum`;
    }
    return true;
  }),
  defineRule('confirmed', (value, [target]: any, ctx) => {
    if (value === ctx.form[target]) {
      return true;
    }
    return 'Passwords must match';
  }),
];

export default rules;