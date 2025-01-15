# Datos solicitados

o Nombre completo: Paolo Samir Tello Uypan
o Número de teléfono: 982254431

# Instrucciones para ejecutar el proyecto

## enviroments

Seguir los pasos enviados en el archivo txt

## Descripción

Prueba técnica FULL STACK para la empresa CPEL SAC.

## Instalación

Siga estos pasos para instalar el proyecto:

1. Clone el repositorio:
   ```bash
   git clone https://github.com/usuario/proyecto.git
   ```
2. Navegue al directorio del proyecto:
   ```bash
   cd api para levantar el servidor
   cd app para levantar el cliente
   ```
3. Instale las dependencias:
   ```bash
   npm install
   ```

## Uso

1. para iniciar las aplicaciones use run dev en ambos:

```bash
npm run dev
```

# Resumen de decisiones técnicas

## Backend

o Api diseñada con Node y javascript, con base de datos Firestore y usando el api de firebase-admin para su gestión,se añadió comentarios en los controladores para agilizar la lectura, se aplicó una estructura modular lo que mejora la legibilidad y el orden al editar rutas, controladores, handlers y demás. Se añadió el uso de middleware para verificación del token enviado por google para mayor seguridad.

## Frontend

o Aplicación creada con React + Vite, se instaló diferentes dependencias como antd y tailwind para agilizar el maquetado, react router dom para proteger rutas si el usuario no esta registrado, useContext para almacenar estados globales, firebase para la gestión de usuarios, yup y formik para las validaciones de formularios, y hot toast para mostrar notificaciones. Se añadió la creación personalizada de un hook encargado de hacer las peticiones a la api con un conector axios para añadirle el bearer token y el refresh token.