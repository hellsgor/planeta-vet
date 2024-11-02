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
      { href: 'tel:79681876936', text: '+7 968 187-69-36' },
      { href: 'mailto:okp@planetvet.ru', text: 'okp@planetvet.ru' },
    ],
    social: [{ href: 'javascript:void(0)', text: 'Написать в Telegram', iconId: 'external' }],
  },

  contacts: [
    {
      modifier: 'moscow',
      city: 'г. Москва',
      address: 'Бережковская набережная, д. 20, стр. 13, 3 этаж',
      phone: { text: '+7 499 110-65-83', href: 'tel:74991106583' },
      email: { text: 'okp@planetvet.ru', href: 'mailto:okp@planetvet.ru' },
      map: {
        blockId: 'map-moscow',
        cords: '55.732920, 37.546210',
      },
    },
    {
      modifier: 'saint-petersburg',
      city: 'г. Санкт-Петербург',
      address: 'ул. Смоленская, 33 лит. А',
      phone: { text: '+7 499 110 65 83', href: 'tel:74991106583' },
      email: { text: 'okp@planetavet.ru', href: 'mailto:okp@planetavet.ru' },
      map: {
        blockId: 'map-saint-petersburg',
        cords: '59.904690, 30.328651',
      },
    },
  ],
};
