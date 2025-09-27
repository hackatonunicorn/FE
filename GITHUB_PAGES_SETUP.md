# Настройка GitHub Pages для UNICORN-FE

## Что было сделано

1. **Настроена Vite конфигурация** - добавлен правильный base path для GitHub Pages
2. **Создан GitHub Actions workflow** - автоматический деплой при пуше в main ветку
3. **Обновлен package.json** - добавлен скрипт для сборки под GitHub Pages
4. **Создан .nojekyll файл** - для корректной работы SPA

## Инструкции по настройке

### 1. Включить GitHub Pages в настройках репозитория

1. Перейдите в Settings вашего репозитория на GitHub
2. Найдите раздел "Pages" в левом меню
3. В разделе "Source" выберите "GitHub Actions"
4. Сохраните настройки

### 2. Настроить права доступа для GitHub Actions

1. Перейдите в Settings → Actions → General
2. В разделе "Workflow permissions" выберите "Read and write permissions"
3. Поставьте галочку "Allow GitHub Actions to create and approve pull requests"
4. Сохраните настройки

### 3. Запустить деплой

После настройки прав:
1. Сделайте коммит и пуш изменений в main ветку
2. GitHub Actions автоматически запустит workflow
3. После успешного выполнения ваш сайт будет доступен по адресу:
   `https://yourusername.github.io/UNICORN-FE/`

### 4. Проверка деплоя

- Workflow можно отслеживать во вкладке "Actions" репозитория
- После успешного деплоя сайт будет доступен по указанному URL
- При каждом пуше в main ветку сайт будет автоматически обновляться

## Локальная разработка

Для локальной разработки используйте:
```bash
npm run dev
```

Для сборки под GitHub Pages:
```bash
npm run build:gh-pages
```

## Структура файлов

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/.nojekyll` - файл для отключения Jekyll на GitHub Pages
- `vite.config.ts` - настроен base path для GitHub Pages
- `package.json` - добавлен скрипт для сборки под GitHub Pages
