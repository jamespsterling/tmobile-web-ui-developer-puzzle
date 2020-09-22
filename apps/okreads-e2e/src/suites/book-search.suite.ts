import { $ } from 'protractor';

export default {
  suite: async (query) => {

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys(query);
    await form.submit();
  }
};