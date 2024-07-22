Aplicación que realicé tiempo siguiendo determinado curso de Udemy aunque con bastantes cosas propias.
Esta se basa en un Back end en base SpringBoot, securizado con Spring Security y OAuth2 y un Front en angular que mediante peticiones sobretodo de tipo REST consigue tener las siguientes características:
<ul>
  <li>Login y seguridad basada en usuarios tanto a nivel de front como de Back.</li>
  <li>Subida de imágenes de perfil.</li>
  <li>Un sistema de facturación con formularios maestro detalle y paginación de facturas.</li>
</ul>

Fue realizado en 2021 siguiendo el curso de Udemy: https://www.udemy.com/course/angular-spring/

Se requiere de Java, Angular y una base de datos Mysql (mi recomendación es usar un docker por no instalarlo) para iniciar este proyecto.
También se requiere de un esquema en la BBDD llamado 'db_springboot_backend' y un usuario llamado 'Willow' con contraseña 'Garcia'.

La forma de iniciar el protyecto para su prueba es la siguiente:
<ol>
  <li> Descargar el proyecto 
  </li>
  <li> Ejecutar el comando java -jar spring-boot-backend-apirest-0.0.1-SNAPSHOT.jar en la carpeta: 'spring-boot-backend-apirest/target' </li>
  <li> Ejecutar el comando ng serve en la carpeta prueba-app</li>
</ol>
