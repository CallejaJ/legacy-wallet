# Inicio: Documentación Central

Bienvenido a **Legacy Wallet**. Esta es tu guía para entender el proyecto de herencia digital criptográfica estructurado sobre la infraestructura de Safe.

## Misión

Investigación y desarrollo de una solución de herencia criptográfica basada en Safe y Safe Modules que permita:

- Vincular testamentos notariales digitales (certificados PKI) con una Safe Account.
- Configurar reglas de inactividad (fe de vida / dead-man's switch) y quórums de herederos.
- Distribuir de forma automática y atómica múltiples activos (ETH y tokens ERC-20).
- Permitir a los herederos reclamar de manera gasless (sin ETH propio) a través del Safe Relay Kit.

## Visión

Un sistema de herencia digital legal, robusto y descentralizado, que elimine la fricción técnica y proteja los activos de los usuarios de por vida mediante infraestructuras auditadas y estándares del ecosistema Web3.

## Documentación Disponible

### Estrategia y Diseño

- [Brainstorming: Legacy Wallet](brainstorming.md)
  Análisis de casos de uso, flujos y arquitectura general.
- [Decisiones del Proyecto](planificacion.md#decisiones-de-diseño-para-el-mvp-simplificadoeconómico)
  Las 15 decisiones críticas de negocio, técnica y legal tomadas para el desarrollo del MVP.

### Especificación Técnica

- [InheritanceModule - Especificación](especificacion-tecnica.md)
  Lógica de Smart Contracts, funciones del Safe Module y estrategia de seguridad.

### Planificación y Progreso

- [Planificación con Safe (6 semanas)](planificacion.md)
  Detalle semanal del plan de trabajo de desarrollo individual.
- [Roadmap de Implementación](roadmap.md)
  Timeline, hitos del proyecto y cronograma semanal del 5 de Junio al 17 de Julio.

## Stack Técnico Adoptado (MVP)

**Frontend:** React 18 + TypeScript 5, conectado a los SDKs de Safe.
**Backend/Oráculo:** Node.js 20 + TypeScript, validación de firmas PKI X.509.
**Smart Contracts & SDKs (Safe):**

- **Safe Account**: Cuenta multisig del titular que custodia los activos.
- **InheritanceModule**: Módulo custom de Safe para gestionar la inactividad y quórums.
- **Safe Protocol Kit**: Gestión e instalación del módulo en la cuenta Safe.
- **Safe API Kit**: Coordinación y almacenamiento de co-firmas off-chain de herederos.
- **Safe Relay Kit (Gelato / ERC-4337)**: Sponsorización de gas para reclamación de beneficiarios.
  **Red de Pruebas:** Ethereum Sepolia Testnet.

## Fases del Flujo de Legado

### Fase 1: Configuración Notarial

El titular sube su certificado de testamento (PKI) y configura las condiciones (herederos, pesos en BPS, tiempo de inactividad y quórum de firmas). El oráculo valida el certificado y configura el módulo on-chain.

### Fase 2: Mantenimiento (Fe de vida)

El titular interactúa periódicamente con la dApp llamando a `submitProofOfLife()`, lo que resetea el contador de inactividad.

### Fase 3: Reclamación

Tras pasar el tiempo de inactividad establecido, un heredero inicia una reclamación. Arranca el período de gracia de 14 días y los herederos firman digitalmente.

### Fase 4: Payout y Cierre

Al alcanzarse el quórum de firmas y finalizar el período de gracia, cualquier beneficiario puede ejecutar `executePayout()` de forma gasless. Los activos de la Safe se distribuyen atómicamente y la herencia se cierra.

## Contacto

| Nombre            | Rol   |
| ----------------- | ----- |
| **Jorge Calleja** | Autor |

---

Última actualización: 05 Junio 2026
