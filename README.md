# Actividad 1: Automatización de API con Playwright

## Objetivos
- Buscar y seleccionar un API de preferencia
- Automatizar el API usando Playwright
- Documentar evidencias de implementación

## API Seleccionado: JSONPlaceholder
- **URL**: https://jsonplaceholder.typicode.com
- **Propósito**: API REST para pruebas y desarrollo
- **Endpoints**: Posts, Users, Comments

## Instalación y Ejecución

### Prerrequisitos
- Node.js v16 o superior
- NPM

### Comandos
```bash
# Instalar dependencias
npm install

# Ejecutar todas las pruebas
npm test

# Ejecutar con interfaz gráfica
npm run test:headed

# Modo debug
npm run test:debug

# Ver reporte HTML
npm run show-report
npx playwright show-report

# Ejecutar prueba específica
npm run test:single "nombre de la prueba"

# Generar reporte JSON limpio
npx playwright test --reporter=json
```

## Estructura de Archivos
```
actividad-1/
├── package.json
├── playwright.config.js
├── tests/
│   ├── api/
│       └── jsonplaceholder.spec.js

├── docs/
│   └── API_DOCUMENTATION.md
└── test-results/
    └── html-report/
```

## Criterios de Evaluación
1. **Selección y descripción del API**: Documentación clara del API elegido
2. **Automatización en Playwright**: Script funcional con validaciones
3. **Evidencia de implementación**: Capturas, videos y reportes
