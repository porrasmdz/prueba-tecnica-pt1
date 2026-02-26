=====VERSION EXPRESSJS=====  
1. Llenar .env y .env.db e instalar deps  
    $pnpm i  
  
2. Levantar contenedor de BD y esperar que este lista  
    $docker compose up -d  

3. Correr migraciones  
    $pnpm run typeorm migration:run 
  
3.0. Transpilar el proyecto IMPORTANTE  
    $pnpm run build  
  
3.1. Ejecutar api localmente en modo dev
    $pnpm run dev  
  
3.2. Alternativamente puede ejecutarse en modo prod  
    $pnpm run start  
  
4. Probar en http://localhost:3000  
USUARIO DE PRUEBA  
{
  "username": "admin@mail.com",
  "password": "adminadmin123" 
}
