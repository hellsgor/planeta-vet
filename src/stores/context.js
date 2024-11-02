export const context = {
  header: {
    navigation: [
      { href: '#about', text: 'О нас' },
      { href: '/services.html', text: 'Услуги' },
      { href: '/contacts.html', text: 'Контакты' },
    ],
  },

  join: {
    list: [
      { text: 'Стратегии для привлечения клиентов и повышения узнаваемости' },
      { text: 'Инструменты для учёта клиентов, записи на приём и управления запасами' },
      { text: 'Программы подготовки для ветеринаров' },
    ],
  },

  footer: {
    navigation: [
      { href: '/ambassador.html', text: 'Амбассадор' },
      { href: '/partner-clinic.html', text: 'Клиника-партнёр' },
      { href: '/vet.html', text: 'Врач клиники' },
      { href: '/advantages.html', text: 'Преимущества' },
      { href: '/contacts.html', text: 'Контакты' },
    ],
    contacts: [
      {
        city: 'г. Москва',
        address: 'Бережковская набережная, д. 20, стр. 13, 3 этаж.',
        phone: { text: '+7 499 110-65-83', href: 'tel:74991106583' },
        email: { text: 'okp@planetvet.ru', href: 'mailto: okp@planetvet.ru' },
      },
      {
        city: 'г. Санкт-Петербург',
        address: 'ул. Смоленская 33',
      },
    ],
    social: [{ href: 'javascript:void(0)', text: 'Написать в Telegram', iconId: 'external' }],
  },
};
