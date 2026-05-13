## Preguntas de entrega

### Sobre Observables y Asincronía

1. ¿Por qué las peticiones HTTP en Angular devuelven un Observable en lugar de la data directa?

Angular utiliza `HttpClient` que devuelve un `Observable` porque las peticiones HTTP son operaciones asíncronas. El `Observable` representa una secuencia de datos que llegará en el futuro y permite suscribirse para recibir la respuesta cuando esté disponible. También permite cancelar la petición si el componente se destruye, y componer fácilmente varias operaciones asíncronas con operadores como `map`, `switchMap` o `catchError`.

2. ¿Qué diferencia hay frente a una Promise?

- `Observable` puede emitir múltiples valores a lo largo del tiempo; `Promise` solo resuelve una vez.
- `Observable` es perezoso: no ejecuta la petición hasta que alguien se suscribe. `Promise` comienza a ejecutarse inmediatamente.
- `Observable` permite cancelar la suscripción y limpiar recursos con `unsubscribe()`. `Promise` no se puede cancelar de forma nativa.
- `Observable` se integra bien con la programación reactiva y los operadores de RxJS.

### Sobre el Patrón Maestro-Detalle

3. ¿Por qué se usa `@Input()` para pasar la ciudad a `CityDetailComponent` en lugar de volver a hacer un GET a `/api/cities/{id}`?

Usar `@Input()` evita llamadas HTTP innecesarias y mejora el rendimiento. El componente padre ya tiene los datos de la ciudad seleccionada, por lo que simplemente los comparte con el detalle. De esa forma, se reutiliza información ya disponible, se reduce la carga de red y la UI responde más rápido.

4. ¿Qué ventaja de diseño tiene que en la respuesta de `GET /api/cities` el campo `country` venga como objeto anidado?

Tener `country` como objeto anidado facilita el consumo en el frontend porque ya se cuenta con la información completa del país sin hacer otra petición adicional. Esto simplifica el modelo de datos, evita transformaciones extra y permite renderizar directamente nombres o campos relacionados del país, mejorando la claridad y reduciendo acoplamiento entre API y cliente.
