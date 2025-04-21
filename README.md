## Repositorio Público

- **URL**: https://github.com/Kose117/JAMBOARD-ArquiTaller.git
- **TAG**: v1.0.1


### Despliegue con Docker Compose

Para ejecutar el despliegue con Docker Compose, asegúrese de que Docker Desktop esté instalado en su computadora y de que la aplicación se encuentre abierta (en ejecución) antes de lanzar el comando.

```bash
git clone https://github.com/Kose117/JAMBOARD-ArquiTaller.git
cd JAMBOARD-ArquiTaller
git checkout v1.0.x (la versión exacta se encuentra en el tag)
docker-compose up --build
```

Una vez que los contenedores estén en marcha, abra su navegador y acceda a http://localhost:5173/auth para comprobar que la aplicación se está ejecutando correctamente.
