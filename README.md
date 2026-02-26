=====VERSION EXPRESSJS=====  
1. Llenar .env y .env.db e instalar deps  
    $pnpm i  
  
2. Correr migraciones  
    $pnpm run typeorm migration:run  
  
3. Levantar contenedor de BD  
    $docker compose up -d  
  
3.1. Ejecutar api localmente  
    $pnpm run dev  
  
4. Probar en http://localhost:3000  
USUARIO DE PRUEBA  
username: admin@mail.com  
password: adminadmin123  
  
===VERSION JAVA====
0. No hace falta ejecutar migraciones porque ya corrieron previamente sobre la misma BD  
1. Llenar application.properties con DB_USER, DB_PASS, JWT_SECRET.  
2. Ejecutar proyecto: ./mvnw spring-boot:run o desde IDE.  
3. Probar en http://localhost:8080.  
    username: admin@mail.com   
    password: adminadmin123.  