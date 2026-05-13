# Preguntas de entrega

### Sobre Observables y Asincronía

#### PREGUNTA 1:

* a 1.1) ¿Por qué las peticiones HTTP en Angular devuelven un Observable en lugar de la data directa?

Angular utiliza HttpClient que devuelve un "Observable" porque las peticiones HTTP son operaciones asíncronas. El "Observable" representa una secuencia de datos que llegará en el futuro y permite suscribirse para recibir la respuesta cuando esté disponible.

---

* a 1.2) ¿Qué diferencia hay frente a una Promise?

"Observable" es multitask, es decir, puede emitir múltiples valores a lo largo del tiempo. En cambio "Promise" solo resuelve una vez. Además, "Observable" no ejecuta la petición hasta que alguien se suscribe,
"Promise" por otro lado, comienza a ejecutarse inmediatamente.

---

### Sobre el Patrón Maestro-Detalle

#### PREGUNTA 2:

* b) ¿Por qué se usa "@Input()" para pasar la ciudad a "CityDetailComponent" en lugar de volver a hacer un GET a "/api/cities/{id}"?

Usar "@Input()" evita llamadas HTTP innecesarias y mejora el rendimiento. El componente perteneciente a "cities" ya tiene los datos de la ciudad seleccionada, por lo que simplemente los comparte con el detalle. De esa forma, se reutiliza información ya disponible, logrando una reduccón en la carga de red.

---

* c) ¿Qué ventaja de diseño tiene que en la respuesta de "GET /api/cities" el campo "country" venga como objeto anidado?

Tener "country" como objeto anidado facilita el consumo en el frontend porque, ya se cuenta con la información completa del país sin hacer otra petición adicional lo que permite renderizar directamente nombres o campos relacionados del país.
