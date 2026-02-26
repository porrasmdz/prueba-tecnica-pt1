init cmd

1. Llenar .env y .env.db
2. Correr migraciones
    $pnpm run typeorm migration:run
3. Levantar contenedores
    $docker compose up -d 
    
    o alternativamente ejecutar en local

    $pnpm i 
    $pnpm run dev

4. Probar en http://localhost:3000
USUARIO DE PRUEBA
username: admin@mail.com
password: adminadmin123

1.
