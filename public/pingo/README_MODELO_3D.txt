PINGO V18 - MODELO GLB RIGGEADO OPCIONAL

V18 funciona con su modelo procedural articulado incluido.
Para sustituirlo por un modelo GLB riggeado/animado profesional:

1. Copia el archivo a public/pingo/pingo-hyperreal.glb
2. Crea un archivo .env.local en la raiz del proyecto con:
   VITE_PINGO_GLTF_URL=/pingo/pingo-hyperreal.glb
   VITE_PINGO_GLTF_SCALE=1
3. Reinicia Vite.

El adaptador busca automaticamente clips cuyos nombres contengan:
Idle/Stand, Walk/Run, Jump/Hop, Land, Wave/Celebrate, Talk/Explain,
Sit/Crouch, Type, Think/Look.

No se incluye un modelo de terceros sin licencia verificable dentro de este paquete.
