# Roadmap: Plan de Implementación de 6 Semanas (1 Desarrollador)

## Semana 1 — Configuración y Smart Contract Base (5 Jun - 12 Jun)

**Objetivo:** Establecer el entorno de desarrollo y crear el esqueleto del módulo de herencia para Safe.

**Tareas:**
- Setup del entorno con Foundry e inicialización del repositorio de contratos.
- Analizar la interfaz de módulos de Safe (`ISafe`, `IModule`).
- Crear el esqueleto del contrato `InheritanceModule.sol` con stubs de funciones críticas (`configureInheritance`, `submitProofOfLife`, `initiateClaim`, `signClaim`, `executePayout`, `cancelClaim`).
- Desplegar una Safe Account de prueba en Sepolia para verificar la integración y la capacidad de instalación del módulo custom.

**Entregables:**
- Proyecto Foundry compilando.
- Contrato base `InheritanceModule.sol` desplegado y verificado como módulo en una Safe de testnet.

---

## Semana 2 — Lógica Core de Smart Contracts & Tests (12 Jun - 19 Jun)

**Objetivo:** Desarrollar la lógica completa de herencia y validar mediante tests robustos.

**Tareas:**
- Implementar la lógica del contrato inteligente: control de inactividad, validación de pesos (BPS 10000), verificación de quórum y distribución atómica de múltiples activos (ETH + ERC-20).
- Escribir tests unitarios exhaustivos en Foundry (casos de inactividad, quórum no alcanzado, expiración de certificado, cancelación del titular, etc.).
- Desplegar e interactuar con el contrato verificado en Sepolia.

**Entregables:**
- Smart contract finalizado, desplegado y verificado on-chain en Sepolia.
- Suite de tests unitarios e integración (+15 casos) completada en un 100% en Foundry.

---

## Semana 3 — Backend / Oráculo (Setup y PKI) (19 Jun - 26 Jun)

**Objetivo:** Configurar el backend y desarrollar la verificación criptográfica del certificado notarial.

**Tareas:**
- Inicializar el backend del proyecto con Node.js, TypeScript y Ethers.
- Configurar OpenSSL para la validación de certificados criptográficos X.509 firmados digitalmente.
- Implementar endpoints iniciales de mock y simulación de la firma del oráculo.

**Entregables:**
- Servidor backend corriendo y documentado.
- Módulo de validación PKI que parsea y valida firmas notariales sobre certificados de prueba.

---

## Semana 4 — Backend / Integración con Safe API Kit (26 Jun - 3 Jul)

**Objetivo:** Permitir que el backend proponga y gestione transacciones utilizando el SDK de Safe.

**Tareas:**
- Integrar `@safe-global/api-kit` para interactuar con el Safe Transaction Service.
- Implementar el endpoint definitivo `POST /oracle/configure` (recibe certificado, valida PKI, crea transacción de configuración y la propone a la Safe).
- Implementar el endpoint `POST /oracle/revalidate` para actualización de certificados.
- Diseñar y documentar la API utilizando OpenAPI / Swagger.

**Entregables:**
- API del Oráculo conectada con testnet Sepolia, lista para proponer firmas a la Safe de forma remota.

---

## Semana 5 — Frontend & Integración con Safe SDKs (3 Jul - 10 Jul)

**Objetivo:** Crear la interfaz del usuario y conectarla con los smart contracts y el backend.

**Tareas:**
- Inicializar el frontend usando React, TypeScript y Vite.
- Integrar `@safe-global/protocol-kit` para inicializar y gestionar la wallet del titular.
- Integrar `@safe-global/relay-kit` para la firma de reclamaciones gasless mediante Gelato / ERC-4337.
- Implementar flujos y pantallas de usuario: Registro de herencia (carga de certificado), Gestión de herederos, Envío de fe de vida (Proof of Life) y Reclamación de activos.

**Entregables:**
- Interfaz de usuario completamente conectada a la blockchain Sepolia y al oráculo backend.

---

## Semana 6 — Integración E2E, Pruebas y Demo (10 Jul - 17 Jul)

**Objetivo:** Conectar todo el flujo, realizar pruebas finales de integración y preparar la demo de entrega.

**Tareas:**
- Pruebas E2E: flujo de configuración → inactividad simulada → reclamación por heredero → pago multi-asset atómico patrocinado (gasless).
- Depuración de errores en frontend, backend y contratos.
- Escribir README de despliegue y documentación técnica general del proyecto.
- Grabar video demo del flujo de usuario de 5 minutos.

**Entregables:**
- Prototipo funcional completo (E2E) corriendo en Sepolia.
- Documentación del proyecto finalizada y video demostrativo.

---

## Timeline de Hitos Críticos

```
05 Jun: Inicio del desarrollo
19 Jun: Smart Contracts deployados y testeados al 100% (Hito 1)
03 Jul: Backend / Oráculo integrado con Safe Transaction Service (Hito 2)
10 Jul: Frontend funcional e integrado con Safe SDKs (Hito 3)
17 Jul: Presentación final y PoC E2E funcionando (Hito 4)
```

---

## Recursos Necesarios

- **1 Desarrollador (Solo yo):** Full-Stack & Blockchain Developer.
- **Infraestructura:** RPC de Sepolia, Safe Transaction Service, servicio de relaying (Gelato/Safe Relay Kit).

---

Última actualización: 04 Junio 2026
