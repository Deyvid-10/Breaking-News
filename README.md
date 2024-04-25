# Noticias Hoy

Noticias Hoy es una plataforma digital que te mantiene actualizado con las últimas noticias y eventos tanto a nivel local como global. Desarrollada utilizando una API creada por mí, la cual consulta información de usuarios y artículos desde una base de datos propia, garantizando así un acceso rápido y confiable a la información más relevante. Además, integra otras APIs externas como OpenWeatherMap para brindar información meteorológica en tiempo real y GetGeoAPI para obtener datos actualizados sobre divisas. Con un diseño intuitivo y contenido variado, Noticias Hoy se posiciona como tu fuente confiable para mantenerte informado sobre los acontecimientos más importantes del día.

Si quieres ver mi trabajo de forma local en tu equipo, revisa mi documentación y sigue los pasos!

## Requisitos

    -Tener instalado node.js y NPM
    -Tener MySQL Workbench instalado

## a) Preparar la base de datos

    1-Crear una conexión con la siguiente configuración:
        hostname: localhost
        username: root
        password: Contrasena20
        schema or database: noticias-hoy
    NOTA: es importante que la configuración sea igual porque la API tiene estos datos configurados para funcionar

    2-Colocar la base de datos (en este caso noticias-hoy) por defecto (click derecho a la base de datos y set as default schema)
    3-Abrir el archivo base_de_datos.sql
    4-Copiar el contenido y pegarlo en tu gestor de base datos
    5-Ejecuta el Query 
    6-Confirmar que las tablas 'article' y 'publisher' se hayan creado. 

## b) Ejecutar o iniciar la API

    1-Abre una terminal
    2-Utiliza el cmdlet 'cd' para ir a la carpeta donde se encuentra la API (ej: cd C:\Users\Deyvid\Documents\Programacion\Noticias-Hoy\API\) 
    3-En la carpeta donde se encuentra la API ejecutar el comando 'npm install' para instalar las dependencias desde el archivo 'package.json'
    4-En la carpeta donde se encuentra la API ejecutar el comando 'npm run dev' para iniciar la API

### `npm install`
### `npm run dev`

## c) Abrir la aplicación

Ahora sí!

    1-Utiliza el cmdlet 'cd' para ir a la carpeta donde se encuentra el proyecto (ej: cd C:\Users\Deyvid\Documents\Programacion\Noticias-Hoy\)
    2-Instala las dependencias con el comando 'npm install'
    3-Abre el archivo All.js (que podras encontrar dentro de la carpeta del proyecto en la ruta \src\components\All,js) ve a la linea 102 descomentala para usar la api que preparaste anteriomente y la linea 103 comentala para que deje de usar la api que esta en la nube (puedes elegir que el proyecto consuma la api local que preparaste anteriormente o la api que ya tengo en la nube)
    4-Para iniciar el proyecto ejecuta 'npm start'

### `npm install`
### `npm start`
